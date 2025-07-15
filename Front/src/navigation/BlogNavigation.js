import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import { FcAbout } from "react-icons/fc";
import { FcSms } from "react-icons/fc";
import { FcDatabase } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { FcCollaboration } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export const BlogNavigation = () => {

    const navigate = useNavigate();

    return(
        <>
            {/* value={value} */}
            <BottomNavigation showLabels sx={{ width: '100%' }}   onChange={(event,newValue)=>{navigate(`/blog/${newValue}`)}}>
                {/* 전체 */}
                <BottomNavigationAction 
                    label="Total" 
                    value="total" 
                    icon={<FcDatabase fontSize={40}/>} />

                <BottomNavigationAction
                    label="Infomation"
                    value="infomation"
                    icon={<FcAbout fontSize={40}/>}
                />

                <BottomNavigationAction
                    label="Error"
                    value="error"
                    icon={<FcHighPriority fontSize={40} />}
                />
                <BottomNavigationAction
                    label="Lounge"
                    value="lounge"
                    icon={<FcCollaboration fontSize={40}/>}
                />
                <BottomNavigationAction 
                    label="Review" 
                    value="review" 
                    icon={<FcSms fontSize={40} />} />
            </BottomNavigation>
        </>
    )
}