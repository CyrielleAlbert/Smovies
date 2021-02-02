/**
 * To do:
 *  - Changer l'étoile avec une étoile toggle connectée à Firebase
 *
 */

export default function Movie({ title, voteAverage, posterPath, ...props }) {
  return (
    <div
      style={{
        flexWrap: 'wrap',
        width: 156,
        height: 210,
        fontFamily: 'Poppins',
        fontSize: 15,
        filter:"drop-shadow(0px 4px 10px rgba(255, 255, 255, 0.05))",
      }}
    >
      <div style={{ width: '100%', height: 180, backgroundColor: 'grey', borderRadius:"14px 14px 0px 0px", }}>
        {posterPath != null  &&
        <img
          src={'https://image.tmdb.org/t/p/original' + posterPath}
          width={'100%'}
          height={'100%'}
          style={{ objectFit: 'cover', objectPosition: '100% 0', borderRadius:"14px 14px 0px 0px" }}
        />}
        {posterPath == null &&
        <div style={{height:180, width:"100%", paddingTop: 80, textAlign:"center"}}> Oops! No poster 😔</div>}
      </div>
      <div
        style={{
          backgroundColor: '#414141',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: 30,
          color: 'white',
          borderRadius: '0px 0px 14px 14px'
        }}
      >
        <div style={{ width: '50%', paddingLeft: 5 }}>{title.length < 8 ? title : title.slice(0, 7) + '...'}</div>
        <div style={{ width: '50%', textAlign: 'right' }}>{voteAverage + '/10 🌟'}</div>
      </div>
    </div>
  )
}
