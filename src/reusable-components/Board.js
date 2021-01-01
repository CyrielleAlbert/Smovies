/**
 * To do:
 *  - Changer l'étoile avec une étoile toggle connectée à Firebase
 *
 */

export default function Board({ name, nStars, movies, ...props }) {
  return (
    <div
      style={{
        width: 156,
        height: 210,
      }}
    >
      <div style={{ height: 180,flexWrap: 'wrap',flexDirection: 'row',display: 'flex' }}>
        {movies.map((moviePoster) => {
          return (
            <div style={{ height: '50%', width: '50%', display: 'flex' }}>
              <img
                src={moviePoster}
                width={'100%'}
                height={'100%'}
                style={{ objectFit: 'cover', objectPosition: '100% 0' }}
              />
            </div>
          )
        })}
      </div>
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
        <div style={{ width: '50%', paddingLeft: 5 }}>{name.length <8?name:name.slice(0,8)+'...'}</div>
        <div style={{ width: '50%', textAlign: 'right' }}>{nStars + '🌟'}</div>
      </div>
    </div>
  )
}
