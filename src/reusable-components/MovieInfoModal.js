import Modal from 'react-modal'
import Popover from 'react-awesome-popover'
import ActorView from "./ActorView.js"

export default function MovieInfoModal({ title, synopsis, posterPath, addToBoard, closeModal, isModalOpen, cast, productionCompanies, productionCountries, releaseDate, movieId = undefined, userBoards = undefined, popOver = false, ...props }) {
  Modal.setAppElement('body')
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        overlay: { backgroundColor: 'rgba(65, 65, 65, 0.01)', backdropFilter: 'blur(10px)', },
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
            src={'https://image.tmdb.org/t/p/original' + posterPath}
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
            <div style={{ fontWeight: 'bolder', fontSize: 20 }}>Synopsis:</div>
            {synopsis}
            <div style={{ fontWeight: 'bolder', marginTop: 20, fontSize: 20 }}> More information:</div>
            {productionCompanies != null && <div><div style={{ color: "#8D8D8D" }}>Production: <div style={{ color: "white" }}>{productionCompanies == null ? "" : productionCompanies[0].name}</div> </div>
              <div style={{ color: "#8D8D8D" }}>Release Date: <div style={{ color: "white" }}>{releaseDate}</div></div></div>}
          </div>
        </div>
      </div>
      {cast != null &&
        <div>
          <div style={{
            marginTop: 50,
            fontFamily: "Poppins",
            fontSize: 15,
            fontWeight: "bolder",
            color: "white",
            paddingLeft: 10
          }}>Main 5 actors:</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              padding: 10,
              backgroundColor: '#4D4D4D',
              marginTop: 10,
            }}
          >
            {cast.slice(0, 5).map((actor) => {
              return (
                <div style={{ margin: 10 }}>
                  <ActorView name={actor.name} posterPath={actor.profile_path}></ActorView>
                </div>
              )
            })}
          </div>
        </div>}
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
        <div style={{ width: '50%' }}>
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
            ← Back to movies
          </button>
        </div>
        <div style={{ width: '50%', justifyContent: 'flex-end', display: 'flex' }}>
          {!popOver && <button
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
            + Add to board
          </button>}
          {popOver &&
            <Popover
              placement={"left-center"}
              arrow={false}>
              <button
                style={{
                  backgroundColor: '#D40000',
                  borderRadius: 31,
                  borderWidth: 0,
                  padding: 10,
                  fontSize: 20,
                  color: 'white',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                + Add to board
              </button>
              <div style={{
                backgroundColor: 'white',
                color: "black",
                margin: 10,
                borderRadius: 14,
                width: 300,
                padding: 10
              }}>
                <div style={{ fontSize: 20, textDecoration: 'black underline', textAlign: 'center' }}> My Boards</div>
                {Object.keys(userBoards).map((boardId) => {
                  return (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      padding: 10,
                      alignItems: "center",
                      justifyContent: 'center'
                    }}>
                      <div style={{ width: "75%", fontSize: 15 }}>{userBoards[boardId].title}</div>
                      {userBoards[boardId].movies !== undefined &&
                      <div style={{ width: "25%", fontSize: 30, textAlign: "right" }} onClick={() => { addToBoard(boardId, movieId) }}>
                        {userBoards[boardId].movies.includes(movieId) ? "✓" : "+"}</div>}
                      {userBoards[boardId].movies === undefined &&
                      <div style={{ width: "25%", fontSize: 30, textAlign: "right" }} onClick={() => { addToBoard(boardId, movieId) }}>
                        {"+"}</div>}
                    </div>
                  )
                })}
              </div>
            </Popover>}
        </div>
      </div>
    </Modal >
  )
}
