import '../../styles/common.scss'

function requireAll(r) {
  return r.keys().map(r);
}

//ui-kit-components styles
requireAll(require.context('../../components/ui-kit-components', true, /\.js|scss$/));

//ui-kit-demo-page components styles
requireAll(require.context('../../components/demo-page-components', true, /\.js|scss$/));




