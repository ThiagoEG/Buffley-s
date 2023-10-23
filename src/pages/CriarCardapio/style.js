import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";

export const LinearBorder = styled(LinearGradient).attrs({
    colors: ['#be3455', 'white'],
  })`
    flex: 1;
    border-width: 3px; /* Largura da borda */
    border-color: transparent; /* Cor da borda transparente */
    justify-content: center;
    align-items: center;
  `;