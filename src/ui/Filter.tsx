import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{
  active?: boolean;
}>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({
  filteredField,
  options,
}: {
  filteredField: string;
  options: { value: string; label: string }[];
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filteredField) || options[0].value;

  function handleClick(value: string) {
    searchParams.set(filteredField, value);
    // reset page number when changing the filter
    if (searchParams.get("page")) {
      searchParams.set("page", "1");
    }
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options?.map(({ value, label }) => (
        <FilterButton
          key={value}
          onClick={() => handleClick(value)}
          active={value === currentFilter}
        >
          {label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
