
  
  const main = {
    lightGray: "#B7B7B7",
    darkGray: "#989898",
    lightBlack: "#333333",
    payment:"#B3B3B3",
    counter:"#F3F3F3",
    bg: "#fff",
  };
  
  const PRIMARY = {
    main: "#E07026",
  };
  
  const SECONDARY = {
    main: "#007489",
  };
  const GRAY ={
    main:"#C7C7C7",
    light:"#FAFAFA"
  }
  const BODY = {
    main: "#333333",
    light: "#fff",
  };
  
  
  
  const ERROR = {
    main: "#D51A1A",
  };
  
  
  
  
  const palette = {
    primary: { ...PRIMARY },
    secondary: { ...SECONDARY },
    body: { ...BODY },
    gray: { ...GRAY },
    error: { ...ERROR },
    main: { ...main },
    background: { default: main.bg, },
    text: {primary: main.lightBlack  },
  
  
  };
  
  export default palette;
  