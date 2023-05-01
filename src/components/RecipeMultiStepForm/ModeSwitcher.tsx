import { Modes, NORMAL_MODE, MARKDOWN_MODE } from '../../providers/RecipeMultiStepFormContext';

interface ModeSwitcher {
  mode: Modes;
  setMode: (str: Modes) => void;
}

const ModeSwitcher = ({ mode, setMode }: ModeSwitcher) => (
  <div className='mode-switcher'>
    <button
      type='button'
      className={`mode-btn ${mode === NORMAL_MODE ? 'active' : ''}`}
      onClick={() => setMode(NORMAL_MODE)}
    >
      Normal
    </button>
    <button
      type='button'
      className={`mode-btn ${mode === MARKDOWN_MODE ? 'active' : ''}`}
      onClick={() => setMode(MARKDOWN_MODE)}
    >
      Markdown
    </button>
  </div>
);

export default ModeSwitcher;
