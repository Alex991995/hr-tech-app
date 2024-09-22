import styles from '@/styles/Loader.module.css';

function Loader() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className={styles.loader}></div>;
    </div>
  );
}

export default Loader;
