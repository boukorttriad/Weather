import wallpaper from '../../assets/img/background.jpg'
import './wallpaper.css'
function Wallpaper() {
  return (
    <div className={'wallpaper-container position-fixed d-flex justify-content-center top-0 bottom-0 end-0 start-0'}>
        <img className= "wallpaper" src={wallpaper} alt="" />
    </div>
  )
}

export default Wallpaper