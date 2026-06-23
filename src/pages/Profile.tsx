import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { moonOutline, sunnyOutline, logoGithub, logoLinkedin } from 'ionicons/icons';
import { useTheme } from '../context/ThemeContext';
import { useHaptic } from '../hooks/useHaptic';
import useScrollAnimation from '../hooks/useScrollAnimation';

const skills = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'Ionic', level: 80 },
  { name: 'Flutter', level: 75 },
  { name: 'Django', level: 70 },
  { name: 'Node.js', level: 85 },
  { name: 'PostgreSQL', level: 65 },
  { name: 'Git', level: 80 },
];

const timelineEvents = [
  { year: '2024', title: 'Desarrollador Full Stack', description: 'Proyectos con React y Ionic' },
  { year: '2023', title: 'Especialización Frontend', description: 'Enfoque en interfaces modernas' },
  { year: '2022', title: 'Inicios en Desarrollo', description: 'Primeros proyectos web' },
];

const Profile: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { triggerHaptic } = useHaptic();
  const [avatarRef, avatarVisible] = useScrollAnimation();
  const [infoRef, infoVisible] = useScrollAnimation();
  const [cardRef, cardVisible] = useScrollAnimation();
  const [skillsRef, skillsVisible] = useScrollAnimation();
  const [timelineRef, timelineVisible] = useScrollAnimation();
  const [socialRef, socialVisible] = useScrollAnimation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="primary" />
          </IonButtons>
          <IonTitle>Información Personal</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => { toggleTheme(); triggerHaptic(); }} color="primary">
              <IonIcon icon={theme === 'dark' ? moonOutline : sunnyOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px' }}>
          <motion.div
            ref={avatarRef as any}
            initial={{ scale: 0 }}
            animate={avatarVisible ? { scale: 1 } : { scale: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <IonAvatar style={{ width: '120px', height: '120px', border: '3px solid var(--ion-color-primary)', padding: '4px' }}>
              <img alt="Silueta de usuario" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
          </motion.div>

          <motion.div
            ref={infoRef as any}
            initial={{ opacity: 0, x: -20 }}
            animate={infoVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.2 }}
            style={{ textAlign: 'center', marginTop: '20px' }}
          >
            <h2 className="antigravity-text">Eliezer Gonzalez</h2>
            <p style={{ color: '#888' }}>Desarrollador Full Stack</p>
          </motion.div>

          <motion.div
            ref={cardRef as any}
            initial={{ opacity: 0, y: 30 }}
            animate={cardVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0, 210, 255, 0.3)' }}
            className="glass-card"
            style={{ padding: '20px', width: '100%', maxWidth: '400px', marginTop: '30px' }}
          >
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: 'var(--ion-color-primary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Email</label>
              <p style={{ margin: '5px 0' }}>eliezer15gonzalez@gmail.com</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: 'var(--ion-color-primary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Ubicación</label>
              <p style={{ margin: '5px 0' }}>Los Teques, Miranda</p>
            </div>
            <div>
              <label style={{ color: 'var(--ion-color-primary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Biografía</label>
              <p style={{ margin: '5px 0', lineHeight: '1.4' }}>Apasionado por crear interfaces que desafían la gravedad y la lógica convencional.</p>
            </div>
          </motion.div>

          <motion.div
            ref={skillsRef as any}
            initial={{ opacity: 0, y: 30 }}
            animate={skillsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.5 }}
            className="glass-card"
            style={{ padding: '25px', width: '100%', maxWidth: '400px', marginTop: '30px' }}
          >
            <h3 style={{ marginBottom: '20px', color: 'var(--ion-color-primary)' }}>Habilidades</h3>
            {skills.map((skill, index) => (
              <div key={skill.name} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '0.9rem' }}>{skill.name}</span>
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>{skill.level}%</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={skillsVisible ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                  style={{
                    height: '8px',
                    background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)',
                    borderRadius: '4px',
                  }}
                />
              </div>
            ))}
          </motion.div>

          <motion.div
            ref={timelineRef as any}
            initial={{ opacity: 0, y: 30 }}
            animate={timelineVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.7 }}
            className="glass-card"
            style={{ padding: '25px', width: '100%', maxWidth: '400px', marginTop: '30px' }}
          >
            <h3 style={{ marginBottom: '20px', color: 'var(--ion-color-primary)' }}>Timeline</h3>
            <div style={{ position: 'relative', paddingLeft: '20px' }}>
              <div style={{
                position: 'absolute',
                left: '5px',
                top: '0',
                bottom: '0',
                width: '2px',
                background: 'linear-gradient(180deg, #00d2ff 0%, #3a7bd5 100%)',
              }} />
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={timelineVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  style={{ marginBottom: '20px', position: 'relative' }}
                >
                  <div style={{
                    position: 'absolute',
                    left: '-17px',
                    top: '5px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#00d2ff',
                    border: '2px solid var(--ion-background-color)',
                  }} />
                  <span style={{
                    fontSize: '0.8rem',
                    color: 'var(--ion-color-primary)',
                    fontWeight: 'bold',
                  }}>{event.year}</span>
                  <h4 style={{ margin: '5px 0', fontSize: '1rem' }}>{event.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>{event.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={socialRef as any}
            initial={{ opacity: 0, y: 30 }}
            animate={socialVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.9 }}
            style={{ display: 'flex', gap: '20px', marginTop: '30px' }}
          >
            <motion.a
              href="https://github.com/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => triggerHaptic()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--ion-color-primary)',
                textDecoration: 'none',
                backdropFilter: 'blur(12px)',
              }}
            >
              <IonIcon icon={logoGithub} size="large" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => triggerHaptic()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--ion-color-primary)',
                textDecoration: 'none',
                backdropFilter: 'blur(12px)',
              }}
            >
              <IonIcon icon={logoLinkedin} size="large" />
            </motion.a>
          </motion.div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
