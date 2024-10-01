export const container={
    MuiContainer:{
        styleOverrides: {
            root : ({ ownerState }) => ({
              ...(ownerState.maxWidth === 'lg' && {
                maxWidth:"1350px !important"
              }

                ),
            }),
        }
}
}

export const button = {
  MuiButton: {
    styleOverrides: {
      root: {
        boxShadow: "none !important",
      },
    },
  },
};

