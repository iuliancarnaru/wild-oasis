import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1" type="h1">
        Update your account
      </Heading>

      <Row type="horizontal">
        <Heading as="h3" type="h3">
          Update user data
        </Heading>
        <p>Update user data form</p>
      </Row>

      <Row type="horizontal">
        <Heading as="h3" type="h3">
          Update password
        </Heading>
        <p>Update user password form</p>
      </Row>
    </>
  );
}

export default Account;
