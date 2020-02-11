import '../../styles/common.scss';
import './ui-kit-demo.scss';

import '../../favicons/safari-pinned-tab.svg';

function requireAll(r) {
  return r.keys().map(r);
}

// ui-kit components styles
requireAll(require.context('../../components/ui-kit-components', true, /\.js|scss$/));

// ui-kit-demo components styles
requireAll(require.context('../../components/ui-kit-demo-components', true, /\.js|scss$/));
