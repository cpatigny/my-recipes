import { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { css } from '../../styled-system/css';
import { sortItemsByPosition } from '../helpers/helpers';
import { convertStepsObjectToArray } from '../helpers/step.helpers';
import { PreparationSteps } from '../types/recipe';

export const RecipeSteps = ({ steps }: { steps: PreparationSteps }) => {
  const recipeSteps = sortItemsByPosition(convertStepsObjectToArray(steps));

  return (
    <>
      {recipeSteps.map((step, i) => (
        <Fragment key={i}>
          <h3
            className={css({
              fontSize: 'clamp(1.36rem, 1.1916rem + 0.8421vw, 1.56rem)',
              fontWeight: '700',
              m: '2.2rem 0 0.625rem',
            })}
          >
            ÉTAPE {i + 1}
          </h3>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className={css({
              '& p': {
                fontSize: '1.2rem',
                lineHeight: '150%',
                mt: '0.625rem',
              },
            })}
          >
            {step.content}
          </ReactMarkdown>
        </Fragment>
      ))}
    </>
  );
};
