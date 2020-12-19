import styled from "styled-components";

export const PatientWidgetWrapper = styled.div`
  text-align: center;
  background-color: #fff;
  height: 100%;

  .profile-image {
    border-radius: 50%;
    height: 150px;
    width: 150px;
    object-fit: cover;
  }
  .space-evenly {
    justify-content: space-evenly;
  }
  .person-image-container {
    .person-image {
      display: flex;
      align-items: center;
    }
  }
  .patient-name-container,
  .company-container,
  .type-container,
  .age-container,
  .gender-container {
    text-align: left;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 22px;
    color: #364463;
    .info-label {
      font-style: normal;
      font-weight: bold;
    }
    .info-value {
      font-size: 12px;
    }
  }
`;
