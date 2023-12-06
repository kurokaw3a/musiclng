/* eslint-disable prettier/prettier */
/* eslint-disable react/no-invalid-html-attribute */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import styles from './AirpodsDetect.module.css';
import batteryIcon2 from './Battery-Indicator.png';
import batteryIcon from './battery.png';

const AirpodsDetect = ({ onClose }) => {
  const closeIcon = 'https://cdn-icons-png.flaticon.com/256/458/458595.png';
  const podsIcon =
    'https://static.wixstatic.com/media/95610f_76377be908454f1a920cdff300e4d59d~mv2.png/v1/fill/w_1034,h_1034,al_c/95610f_76377be908454f1a920cdff300e4d59d~mv2.png';
  const caseIcon =
    'https://yabloko-sochi.ru/image/cache/catalog/aksessuary/AirPods/2019/PRO/MWP22-f-900x800.png';
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1 className={styles.title}>AirPods Pro</h1>
        <div onClick={onClose} className={styles.close}>
          <img
            rel='prefetch prerender'
            src={closeIcon}
            className={styles.closeIcon}
          />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.airpods}>
          <div className={styles.podsBlock}>
            <img
              rel='prefetch prerender'
              className={styles.podsIcon}
              src={podsIcon}
            />
            <img
              rel='prefetch prerender'
              className={styles.battery}
              src={batteryIcon}
            />
            <p className={styles.percent}>96 %</p>
          </div>
          <div className={styles.podsBlock}>
            <img
              rel='prefetch prerender'
              className={styles.podsIcon}
              src={caseIcon}
            />
            <img
              rel='prefetch prerender'
              className={styles.battery}
              src={batteryIcon2}
            />
            <p className={styles.percent}>50 %</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirpodsDetect;
