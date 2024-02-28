import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BarChart from "./BarChart";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";


const ChartWrapper = ({ chartType, data, title, filter }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const transformedData = []

  const uniqueFiterValue = [...new Set(data.map(item => item[filter]))];
  for(let i=0; i<uniqueFiterValue.length; i++){     
    let uniqueFiterData = {type:title, filterId : uniqueFiterValue[i]}
    data.filter((item) => item[filter] === uniqueFiterValue[i]).forEach((item)=>{
      uniqueFiterData[item.category] =  item.totalAmount
    })
    transformedData.push(uniqueFiterData)
  }

  const component =
    chartType === "BarChart" ? (
      <BarChart data={transformedData} filterOption={filter} type={title}/>
    ) : (
      ""
    );
  
  return (
    <Card sx={{ backgroundColor: colors.primary[400] }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Typography variant="h4">{title}</Typography>}
      />
      <CardContent sx={{ height: "22rem", p: 0 }}>{component}</CardContent>
    </Card>
  );
};

export default ChartWrapper;



