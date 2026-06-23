import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState, useRef } from 'react';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Menu from './components/Menu';
import MouseTrail from './components/MouseTrail';
import ParticleControls from './components/ParticleControls';
import { ThemeProvider } from './context/ThemeContext';
import { useGamification } from './hooks/useGamification';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/antigravity.css';

setupIonicReact();

const AppContent: React.FC = () => {
  const [interactionMode, setInteractionMode] = useState<'repulsion' | 'attraction'>('repulsion');
  const [particleCount, setParticleCount] = useState(80);
  const [speed, setSpeed] = useState(1);
  const [interactionRadius, setInteractionRadius] = useState(200);
  const [gravityEnabled, setGravityEnabled] = useState(false);
  const { particlesActivated, mouseDistance } = useGamification();

  const handleReset = () => {
    setInteractionMode('repulsion');
    setParticleCount(80);
    setSpeed(1);
    setInteractionRadius(200);
    setGravityEnabled(false);
  };

  return (
    <IonApp>
      <MouseTrail
        interactionMode={interactionMode}
        particleCount={particleCount}
        speed={speed}
        interactionRadius={interactionRadius}
        gravityEnabled={gravityEnabled}
      />
      <ParticleControls
        interactionMode={interactionMode}
        onInteractionModeChange={setInteractionMode}
        particleCount={particleCount}
        onParticleCountChange={setParticleCount}
        speed={speed}
        onSpeedChange={setSpeed}
        interactionRadius={interactionRadius}
        onInteractionRadiusChange={setInteractionRadius}
        gravityEnabled={gravityEnabled}
        onGravityToggle={() => setGravityEnabled(!gravityEnabled)}
        onReset={handleReset}
        particlesActivated={particlesActivated}
        mouseDistance={mouseDistance}
      />
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/contact">
                <Contact />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
