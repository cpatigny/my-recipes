import { useRecipeMultiStepForm } from '../../../contexts/RecipeMultiStepFormContext';
import { css } from '../../../../styled-system/css';
import { wrap } from '../../../../styled-system/patterns';

import { Block } from '../../Block';
import { InfoText } from '../../InfoText';
import { UnderlineInput } from '../../UnderlineInput';

interface NbOfServingsProps {
  handleStepSubmit: (e: React.FormEvent) => void;
}

export const NbOfServings = ({ handleStepSubmit }: NbOfServingsProps) => {
  const { step, recipeFormData, handleChange } = useRecipeMultiStepForm();
  const { nbServings, servingsUnit } = recipeFormData;

  return (
    <Block>
      <p className={css({ mb: '0.5rem' })}><b>Nombre de portions :</b></p>
      <form
        id={step.formId}
        onSubmit={handleStepSubmit}
        className={wrap({
          gap: '0.6rem 1rem',
          align: 'center',
        })}
      >
        <UnderlineInput
          labelText='XX'
          name='nbServings'
          type='number'
          min='1'
          step='1'
          required
          value={nbServings}
          onChange={handleChange}
          className={css({ maxW: '4.5rem' })}
        />
        <UnderlineInput
          labelText='Personnes, tartes, bols...'
          name='servingsUnit'
          type='text'
          required
          value={servingsUnit}
          onChange={handleChange}
          className={css({ maxW: '100%', w: '16rem' })}
        />
      </form>
      <InfoText>Exemple : 2 personnes, 1 tarte, 4 bols...</InfoText>
    </Block>
  );
};
