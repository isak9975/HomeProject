import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const Blog = () => {
    return(
        <div>
            {/* value={value} */}
            <BottomNavigation sx={{ width: '100%' }}   onChange={()=>{}}>
            <BottomNavigationAction
                label="Recents"
                value="recents"
                icon={<RestoreIcon />}
            />
            <BottomNavigationAction
                label="Favorites"
                value="favorites"
                icon={<FavoriteIcon />}
            />
            <BottomNavigationAction
                label="Nearby"
                value="nearby"
                icon={<LocationOnIcon />}
            />
            <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
            </BottomNavigation>
            <h2>블로그 페이지 메인입니다.</h2>
        </div>
    )
}