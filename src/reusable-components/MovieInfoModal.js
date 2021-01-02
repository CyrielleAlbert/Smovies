import Modal from 'react-modal'
export default function MovieInfoModal({ title, synopsis, posterPath, addToBoard, closeModal, isModalOpen, ...props }) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        overlay: { backgroundColor: 'rgba(65, 65, 65, 0.01)', backdropFilter: 'blur(10px)',},
        content: {
          marginTop: 60,
          marginBottom: 10,
          marginLeft: 60,
          marginRight: 60,
          backgroundColor: '#414141',
          boxShadow: '0px 0px 45px 25px rgba(0, 0, 0, 0.25)',
          borderWidth: 0,
          borderRadius: 0,
        },
      }}
    >
      <div
        style={{
          backgroundColor: '#414141',
          fontFamily: 'Poppins',
          color: 'white',
          padding: 10,
          flexDirection: 'row',
          display: 'flex',
        }}
      >
        <div style={{ width: '25%' }}>
          <img
            src={posterPath}
            width={'100%'}
            height={'auto'}
            style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))', borderRadius: 17 }}
          />
        </div>
        <div style={{ width: '70%', textAlign: 'left', marginLeft: 100 }}>
          <div style={{ fontSize: 40, textAlign: 'center', fontFamily: 'Playfair Display' }}>
            {title}
          </div>
          <div style={{ fontSize: 15, maxWidth: '80%', marginTop: 20 }}>
            <div style={{ fontWeight: 'bolder' }}>Synopsis:</div>
            {synopsis}
            <div style={{ fontWeight: 'bolder', marginTop: 20 }}> More information:</div>
            Not implemented
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
        <div style={{ width: '50%' }}>
          <button
            style={{
              backgroundColor: '#D40000',
              borderRadius: 31,
              borderWidth: 0,
              padding: 10,
              fontSize: 20,
              color: 'white',
              width: '50%',
              textAlign: 'center',
            }}
            onClick={addToBoard}
          >
            + Add to a board
          </button>
        </div>
        <div style={{ width: '50%', justifyContent: 'flex-end', display: 'flex' }}>
          <button
            style={{
              backgroundColor: '#4C4C4C',
              borderRadius: 31,
              borderWidth: 0,
              padding: 10,
              fontSize: 20,
              color: 'white',
              width: '50%',
              textAlign: 'center',
            }}
            onClick={closeModal}
          >
            close
          </button>
        </div>
      </div>
    </Modal>
  )
}