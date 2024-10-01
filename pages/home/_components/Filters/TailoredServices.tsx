import {Box  ,Typography} from "@mui/material"
import React ,{FunctionComponent} from 'react'      
import { useTranslation } from 'react-i18next';      
interface Props {}
const TailoredServices :FunctionComponent<Props> = () => {

    const {t} = useTranslation()      

  return (
    <Box sx={{display: 'flex', alignItems:"baseline", justifyContent: 'center' , color:"body.light" ,py:2}}>
     
     <Typography variant="body1" >
        this Service isn&#39;t available on site, If you need anything 
     </Typography>
     <Typography variant="subtitle1" sx={{ml:0.5}}>Just Call Us 19341</Typography>
    </Box>
  )
};

export default TailoredServices
