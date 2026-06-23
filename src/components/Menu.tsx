import React from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import { homeOutline, personOutline, mailOutline } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import { useHaptic } from '../hooks/useHaptic';
import './Menu.css';

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

// Aquí defino la estructura de las páginas de mi aplicación para el menú lateral
const appPages: AppPage[] = [
  {
    title: 'Inicio',
    url: '/home',
    icon: homeOutline
  },
  {
    title: 'Información Personal',
    url: '/profile',
    icon: personOutline
  },
  {
    title: 'Contacto',
    url: '/contact',
    icon: mailOutline
  }
];

const Menu: React.FC = () => {
  const location = useLocation();
  const { triggerHaptic } = useHaptic();

  return (
    <IonMenu contentId="main" type="overlay">
      {/* Título del menú que se ve arriba */}
      <IonHeader>
        <IonToolbar>
          <IonTitle className="antigravity-text">Ejercicio 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <IonList id="menu-list">
          {/* Recorro mi lista de páginas para crear los botones del menú dinámicamente */}
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                  onClick={() => triggerHaptic()}
                  button
                >
                  <IonIcon aria-hidden="true" slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
