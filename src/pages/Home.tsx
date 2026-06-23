import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonButton,
  IonIcon,
} from '@ionic/react';
import React from 'react';
import { motion } from 'framer-motion';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import { useTheme } from '../context/ThemeContext';
import { useHaptic } from '../hooks/useHaptic';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Home.css';

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { triggerHaptic } = useHaptic();
  const [heroRef, heroVisible] = useScrollAnimation();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="primary" />
          </IonButtons>
          <IonTitle>Inicio</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => { toggleTheme(); triggerHaptic(); }} color="primary">
              <IonIcon icon={theme === 'dark' ? moonOutline : sunnyOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="home-container">
          <motion.div
            ref={heroRef as any}
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="hero-section"
          >
            <h1 className="antigravity-text main-title">Bienvenido profesor Carlos Márquez</h1>
            <p className="subtitle">Una experiencia inmersiva diseñada para el futuro.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0, 210, 255, 0.3)' }}
            className="glass-card main-card"
          >
            <h3>Explora el Sistema</h3>
            <p>Navega a través de las diferentes secciones para conocer más sobre nuestra visión y tecnología.</p>
            
            <IonText color="primary">
              <p>Mueve tu mouse para ver el efecto de partículas. Haz click para explosiones.</p>
            </IonText>
          </motion.div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
