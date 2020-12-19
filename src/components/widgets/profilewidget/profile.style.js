import styled from "styled-components";
const ProfileWrapper = styled.div`
  padding: 15px;
  font-style: normal;
  font-weight: normal;
  .main-header {
    font-weight: bold;
    font-size: 20px;
    line-height: 32px;
    color: #1b2031;
    .edit-profile-btn {
      width: 123px;
      height: 39px;
      background: #6e1c74;
      border-radius: 8px;
      font-size: 14px;
      line-height: 22px;
      float: right;
    }
  }
  .sub-header {
    font-size: 12px;
    line-height: 18px;
    color: #bebdc5;
  }
  .left-panel {
    border-right: 0.3px solid #b1b1b1;
    .body-container {
      .logo {
        display: flex;
        align-items: center;
      }
      .company-name,
      .contact-phone,
      .location,
      .created {
        .label {
          font-size: 14px;
          line-height: 22px;
          color: #364463;
        }
        .value {
          font-weight: bold;
          font-size: 14px;
          line-height: 32px;
          color: #000000;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: default;
        }
      }
      .contact-email {
        .label {
          font-size: 14px;
          line-height: 22px;
          color: #364463;
        }
        .value {
          font-size: 16px;
          line-height: 24px;
          color: #2f80ed;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: default;
        }
      }
    }
  }
  .right-panel {
    .body-container {
      .label {
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #000000;
      }
      .value {
        font-weight: bold;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: #2f80ed;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: default;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .left-panel {
      border-right: none;
      border-bottom: 0.3px solid #b1b1b1;
    }
  }
`;

export default ProfileWrapper;
