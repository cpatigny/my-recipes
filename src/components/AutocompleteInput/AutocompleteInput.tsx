import { useRef, useState } from 'react';

import UnderlineInput from '../UnderlineInput/UnderlineInput';
import Autocomplete from './Autocomplete';

export interface RequiredProps {
  id: string;
}

interface AutocompleteInputProps<T extends RequiredProps>
  extends React.InputHTMLAttributes<HTMLInputElement> {
    matchingObjects: T[] | null;
    propertyToShow: keyof T;
    secondaryPropertyToShow?: keyof T;
    selectItem: (obj: T) => void;
    setMatchingObjects: React.Dispatch<React.SetStateAction<T[] | null>>;
    error?: boolean;
    labelText: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    noMatchingMsg: string;
}

const AutocompleteInput = <T extends RequiredProps>({
  matchingObjects,
  propertyToShow,
  secondaryPropertyToShow,
  selectItem,
  setMatchingObjects,
  error,
  value,
  onChange,
  labelText,
  noMatchingMsg,
  name,
  ...inputProps
}: AutocompleteInputProps<T>) => {
  const [autocompleteIsShow, setAutocompleteIsShow] = useState(false);

  const autocompleteContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const showAutocomplete = () => setAutocompleteIsShow(true);

  const hideAutocomplete = () => setAutocompleteIsShow(false);

  const hideOnClickOutside = (e: React.FocusEvent) => {
    if (!autocompleteContainerRef.current) return;

    const clickIsOutsideAutocomplete = !autocompleteContainerRef.current.contains(e.relatedTarget);
    if (clickIsOutsideAutocomplete) {
      hideAutocomplete();
    }
  };

  const selectItemAndCloseAutocomplete = (obj: T) => {
    selectItem(obj);
    hideAutocomplete();
    setMatchingObjects(null);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    showAutocomplete();
  };

  const handleFocus = () => {
    // do not show autocomplete if user just selected an item
    if (matchingObjects) {
      showAutocomplete();
    }
  };

  const containerClassName = `${name}-container`;

  return (
    <div className={`autocomplete-container ${containerClassName}`} ref={autocompleteContainerRef}>
      <UnderlineInput
        labelText={labelText}
        error={error}
        type='text'
        name={name}
        value={value}
        onFocus={handleFocus}
        onBlur={hideOnClickOutside}
        onChange={handleChange}
        ref={inputRef}
        {...inputProps}
      />

      {matchingObjects && value && autocompleteIsShow && (
        <Autocomplete<T>
          matchingObjects={matchingObjects}
          propertyToShow={propertyToShow}
          secondaryPropertyToShow={secondaryPropertyToShow}
          noMatchingMsg={noMatchingMsg}
          selectItem={selectItemAndCloseAutocomplete}
        />
      )}
    </div>
  );
};

export default AutocompleteInput;
