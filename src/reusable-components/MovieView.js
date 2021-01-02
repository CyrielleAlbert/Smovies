/**
 * To do:
 *  - Changer l'étoile avec une étoile toggle connectée à Firebase
 *
 */

export default function Movie({ title, voteAverage, posterPath, ...props }) {
  return (
    <div
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        display: 'flex',
        width: 156,
        height: 210,
        backgroundColor: 'black',
      }}
    >
      <div style={{ width: '100%', height: 180, backgroundColor: 'grey',}}>
        <img
          src={'https://image.tmdb.org/t/p/original' + posterPath}
          width={'100%'}
          height={'100%'}
          style={{ objectFit: 'cover', objectPosition: "100% 0",}}
        />
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
        <div style={{ width: '50%', paddingLeft: 5 }}>{title.length<8?title:title.slice(0,8)+'...'}</div>
        <div style={{ width: '50%', textAlign: 'right' }}>{voteAverage + '/10 🌟'}</div>
      </div>
    </div>
  )
}
