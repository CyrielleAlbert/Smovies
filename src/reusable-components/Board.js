
/**
 * To do: 
 *  - Changer l'étoile avec une étoile toggle connectée à Firebase 
 * 
 */


export default function Board({ name, nStars, movies, ...props }) {
  return (
    <div
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        display: 'flex',
        width: 156,
        height: 180,
        backgroundColor: 'red',
      }}
    >
      {movies.map((moviePoster) => {
        return (
          <div style={{ maxHeight: 90, maxWidth: 78, display: 'flex' }}>
            <div style={{ width: '100%', height: 'auto', backgroundColor: 'grey' }}>
              <img src={moviePoster} width={'100%'} height={'auto'} />
            </div>
          </div>
        )
      })}
      <div style={{backgroundColor:'#414141', display: 'flex', flexDirection:'row', width:"100%", height:30, color:"white"}}>
        <div style={{width:'50%', paddingLeft:5}}>{name}</div>
        <div style={{width:'50%', textAlign:"right"}}>{nStars + "🌟"}</div>
      </div>
    </div>
  )
}
