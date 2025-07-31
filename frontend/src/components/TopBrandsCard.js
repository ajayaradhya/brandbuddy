import { Card, CardContent, Typography, Box, Stack } from "@mui/material";

// Grayscale stacked progress bar
function BrandProgressBar({ totalPaid, totalBarter }) {
  const total = totalPaid + totalBarter;
  const paidPercent = total ? (totalPaid / total) * 100 : 0;
  const barterPercent = total ? (totalBarter / total) * 100 : 0;

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: 10,
          borderRadius: 5,
          backgroundColor: '#e0e0e0',
          overflow: 'hidden',
          mt: 1,
        }}
      >
        <Box
          sx={{
            width: `${paidPercent}%`,
            height: '100%',
            bgcolor: '#222', // dark gray/black for Paid
            position: 'absolute',
            transition: 'width 0.4s cubic-bezier(.4,2,.6,1)',
          }}
        />
        <Box
          sx={{
            width: `${barterPercent}%`,
            height: '100%',
            bgcolor: '#bdbdbd', // light gray for Barter
            position: 'absolute',
            left: `${paidPercent}%`,
            transition: 'width 0.4s cubic-bezier(.4,2,.6,1)',
          }}
        />
      </Box>

      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 10, height: 10, bgcolor: '#222', mr: 0.5, borderRadius: 1 }} />
          <Typography variant="caption" color="text.primary">Paid</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 10, height: 10, bgcolor: '#bdbdbd', mr: 0.5, borderRadius: 1 }} />
          <Typography variant="caption" color="text.secondary">Barter</Typography>
        </Box>
      </Stack>
    </>
  );
}

export default function TopBrandsCard({ data }) {
  return (
    <Card
      sx={{
        flexGrow: 1,
        width: "100%",
        height: 400,
        overflowY: "auto",
        bgcolor: "#fff",
        borderRadius: 3,
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)",
      }}
    >
      <CardContent sx={{ width: "100%", height: "100%" }}>
        {data.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No data available
          </Typography>
        ) : (
          data.map((brand, index) => (
            <Box
              key={index}
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: "#f7f7f7",
                boxShadow: "0 1px 4px 0 rgba(0,0,0,0.03)",
                transition: "box-shadow 0.2s",
                "&:hover": { boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)" }
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                  {index + 1}. {brand.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  ₹ {brand.total_value.toLocaleString()} • {brand.total_collabs} Collabs
                </Typography>
              </Stack>
              <BrandProgressBar
                totalPaid={brand.total_paid}
                totalBarter={brand.total_barter}
              />
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
}
