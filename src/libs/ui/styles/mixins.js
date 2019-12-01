const mixins = {
  borderImage: (color1, color2, width) => `
    border-width: 0 0 ${width};
    border-style: solid;
    border-color: ${color1};
    -webkit-border-image: -webkit-gradient(
      linear,
      0 0,
      100 % 0,
      from(${color1}),
      to(${color2})
    );
    -webkit-border-image: -webkit-linear-gradient(left, ${color1}, ${color2});
    -moz-border-image: -moz-linear-gradient(left, ${color1}, ${color2});
    -o-border-image: -o-linear-gradient(left, ${color1}, ${color2});
    border-image: -webkit-linear-gradient(left, ${color1}, ${color2}) 20;
  `,
};

export default mixins;