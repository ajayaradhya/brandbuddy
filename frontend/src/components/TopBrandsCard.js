import { Card, CardContent, Typography, Box, Stack } from "@mui/material";

// Reusable stacked progress bar showing Paid and Barter percentages
function BrandProgressBar({ totalPaid, totalBarter }) {
  const total = totalPaid + totalBarter;
  const paidPercent = total ? (totalPaid / total) * 100 : 0;
  const barterPercent = total ? (totalBarter / total) * 100 : 0;

  return (
    <>
      <Box sx={{ position: 'relative', height: 10, borderRadius: 5, backgroundColor: '#e0e0e0', overflow: 'hidden' }}>
        <Box
          sx={{
            width: `${paidPercent}%`,
            height: '100%',
            bgcolor: '#1976d2',
            position: 'absolute',
          }}
        />
        <Box
          sx={{
            width: `${barterPercent}%`,
            height: '100%',
            bgcolor: '#f9a825',
            position: 'absolute',
            left: `${paidPercent}%`,
          }}
        />
      </Box>

      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 10, height: 10, bgcolor: '#1976d2', mr: 0.5 }} />
          <Typography variant="caption">Paid</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 10, height: 10, bgcolor: '#f9a825', mr: 0.5 }} />
          <Typography variant="caption">Barter</Typography>
        </Box>
      </Stack>
    </>
  );
}

export default function TopBrandsCard({ data }) {
  return (
    <Card sx={{ flexGrow: 1, width: "100%", height: 400 }}>
      <CardContent sx={{ width:"100%", height: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Top Performing Brands (by Total Value)
        </Typography>
        {data.length === 0 ? (
          <Typography variant="body2" color="textSecondary">No data available</Typography>
        ) : (
          data.map((brand, index) => (
            <Box key={index} sx={{ mt: 2, p: 2, borderRadius: 2, bgcolor: '#f5f5f5' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="bold">
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
