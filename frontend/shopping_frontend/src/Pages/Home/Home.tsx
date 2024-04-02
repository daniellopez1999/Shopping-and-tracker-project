import BasicCard from '../../Components/Card/Card';
import hamburgerImagePath from '../../assets/hamburger-494706_640.jpg';
import deliveryRiderPath from '../../assets/Free-delivery-vector-royalty-free-PNG.png';
const Home = () => {
  return (
    <div
      id="card-container"
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        <BasicCard
          reference={'/products'}
          title={'Products'}
          image={hamburgerImagePath}
        />
        <BasicCard
          reference={'/orders'}
          title={'Orders'}
          image={deliveryRiderPath}
        />
      </div>
    </div>
  );
};

export default Home;
