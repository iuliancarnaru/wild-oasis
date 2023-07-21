import supabase, { supabaseUrl } from "./supabase";

export async function signup({
  full_name,
  email,
  password,
}: {
  full_name: string;
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: {
  password: string;
  fullName: string;
  avatar: string;
}) {
  // update password OR full_name
  let updateData;

  if (password) {
    updateData = { password };
  }

  if (fullName) {
    updateData = {
      data: {
        full_name: fullName,
      },
    };
  }

  const { data, error } = await supabase.auth.updateUser({
    ...updateData,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) return data;

  // upload avatar
  const fileName = `avatar-${data.user.id}-${Date.now()}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  // update avatar in the user
  const { data: updatedUser, error: updateUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateUserError) {
    throw new Error(updateUserError.message);
  }

  return updatedUser;
}
