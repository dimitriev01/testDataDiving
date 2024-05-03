import { ToolTip } from '../shared/ui/tooltip';
import '../shared/styles/index.scss'

export const App = () => {
  return (
    <div className={'App'}>
      <ToolTip
        title={'wubba lubba dub dub'}
        text={'chipi chipi chapa chapa'}
        delay={100}
      />
    </div>
  );
}

