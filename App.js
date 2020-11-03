import React from 'react';

import Store from './components/utils/Store';
import Navigation from './components/navigation/Navigation';

export default function App() {
  return (
    <Store>
      <Navigation />
    </Store>
  );
}
