import React, { useState } from 'react';

interface RemoteConfig {
  url: string;
  name: string;
  module: string;
}

const loadComponent = (remote: string, module: string) => {
  return async () => {
    const factory = await (window as any)[remote].get(module);
    return factory();
  }
}

const useDynamicScript = (url?: string) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!url) {
      return;
    }

    const element = document.createElement("script");

    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${url}`);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

const Remote: React.FC<{ system?: RemoteConfig }> = ({
  system
}) => {
  const { ready, failed } = useDynamicScript(system && system.url)

  if (!system) {
    return <div>no system</div>
  }

  if (failed) {
    return <div>Failed</div>
  }

  if (!ready) {
    return <div>loading ...</div>
  }

  const Component = React.lazy(loadComponent(system.name, system.module))
  return (
    <React.Suspense fallback="Loading Button">
      <Component/>
    </React.Suspense>
  )
}

const App: React.FC = () => {
  const [system, setSystem] = useState<RemoteConfig>();

  const systems: { [key: string]: RemoteConfig } = {
    app1: {
      name: 'app1',
      url: 'http://localhost:3002/remoteEntry.js',
      module: 'Button'
    },
    app2: {
      name: 'app2',
      url: 'http://localhost:3003/remoteEntry.js',
      module: 'Button'
    }
  }

  return <div>
    <h1>host</h1>
    <div>
      <button onClick={() => setSystem(systems.app1)}>app1</button>
      <button onClick={() => setSystem(systems.app2)}>app2</button>
    </div>
    <Remote system={system}/>
  </div>
}

export default App;
