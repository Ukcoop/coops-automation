'use client';

import Mermaid from '../components/mermaid';

export default function Home() {
  const chartDefinition = 'graph TD; a(start)-->b(end)'

  return (
    <Mermaid chart={chartDefinition} />
  );
}
