/**
 * To do:
 *  - Changer l'étoile avec une étoile toggle connectée à Firebase
 *
 */

export default function BoardView({ name, nStars, postersPath, hideBanner = false, ...props }) {
  if (postersPath != undefined) {
    while (postersPath.length<4){
      postersPath.push(null)
    }
    return (
      <div
        style={{
          width: 156,
          height: 210,
          fontFamily: 'Poppins',
          fontSize: 15,
          flexWrap: 'wrap',
          filter:"drop-shadow(0px 4px 10px rgba(255, 255, 255, 0.05))",
          ...props,

        }}
      >
        <div
          style={{
            height: JSON.stringify(180*100/210)+'%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            display: 'flex',
          }}
        >
          {postersPath.map((moviePoster, index) => {
            return (
              <div style={{ height: '50%', width: '50%', display: 'flex' }} key={moviePoster + JSON.stringify(index)}>
                {moviePoster !== null &&
                  <img
                    src={'https://image.tmdb.org/t/p/original' + moviePoster}
                    width={'100%'}
                    height={'100%'}
                    style={{ objectFit: 'cover', objectPosition: '100% 0' }}
                  />}
                {moviePoster == null &&
                  <div style={{ width: '100%', height: '100%', color: 'grey', backgroundColor: "#575757" }}>No Poster</div>}
              </div>
            )
          })}
        </div>
        {!hideBanner &&
          <div
            style={{
              backgroundColor: '#414141',
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: 30,
              color: 'white',
            }}
          >
            <div style={{ width: '50%', paddingLeft: 5, textAlign: "left" }}>{name.length < 8 ? name : name.slice(0, 7) + '...'}</div>
            <div style={{ width: '50%', textAlign: 'right' }}>{nStars + '🌟'}</div>
          </div>}
      </div>
    )
  } else {
    return <div></div>
  }
}
