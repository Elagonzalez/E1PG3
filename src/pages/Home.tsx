import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
} from '@ionic/react';
import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      {/* Cabecera de la página con el botón para abrir el menú lateral */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="primary" />
          </IonButtons>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="home-container">
          {/* Sección de bienvenida con una animación de entrada suave usando framer-motion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-section"
          >
            <h1 className="antigravity-text main-title">Bienvenido profesor Carlos Márquez</h1>
            <p className="subtitle">Una experiencia inmersiva diseñada para el futuro.</p>
          </motion.div>

          {/* Tarjeta con efecto "glassmorphism" que contiene la información principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card main-card"
          >
            <h3>Explora el Sistema</h3>
            <p>Navega a través de las diferentes secciones para conocer más sobre nuestra visión y tecnología.</p>
            
            {/* Un pequeño recordatorio para que el usuario pruebe el efecto que programamos */}
            <IonText color="primary">
              <p>Mueve tu mouse para ver el efecto de partículas.</p>
            </IonText>
          </motion.div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
