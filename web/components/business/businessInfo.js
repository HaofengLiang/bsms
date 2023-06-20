import { Card, CardContent, Typography } from "@mui/material";

export default function BusinessInfo({ business }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        my: 2,
      }}
    >
      <CardContent>
        <Typography variant="h4" component="h2">
          {business.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
