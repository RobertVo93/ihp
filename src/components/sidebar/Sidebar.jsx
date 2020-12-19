import React, { Fragment, useEffect, useState } from "react";
import SidebarWrapper from "./sidebar.style";
import Radium from "radium";
import NavList from "components/sidebar/NavList";
import { sidebarData } from "util/data/sidebar";
import { grid, user, busy, idle, online, question, avatarUser, ProfileLockScreen, invisible, lock, logoutIcon, message, assign } from "helper/constant";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink } from "react-router-dom";
import IntlMessages from "util/intlMessages";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import settingactions from "redux/themeSettings/actions";
import { PopoverBody, UncontrolledPopover } from "reactstrap";
import AuthActions from "redux/auth/actions";
import { blobToObjectURL } from "helper/methods";
import firebase from 'firebase';

const { logout } = AuthActions;

const { sidebarMini } = settingactions;

const Sidebar = props => {
	let listNameStyle;
	let sidebar;
	let sideScrollStyle;

	const [sidebarDataLocal, setSidebarLocal] = useState([]);

	const {
		mini,
		drawerWidth,
		miniDrawerWidth,
		onMouseEnter,
		onMouseLeave,
		sidebarTheme,
		layoutTheme,
		closeDrawer,
		themeSetting,
	} = props;

	if (
		themeSetting.toolbarAlignValue === "above" &&
		themeSetting.footerAlignValue === "above"
	) {
		sideScrollStyle = {
			zIndex: 5,
			height: "calc(100vh - 190px)"
		};
	} else if (themeSetting.toolbarAlignValue === "above") {
		sideScrollStyle = {
			zIndex: 5,
			height: "calc(100vh - 145px)"
		};
	} else if (themeSetting.footerAlignValue === "above") {
		sideScrollStyle = {
			zIndex: 5,
			height: "calc(100vh - 128px)"
		};
	} else {
		sideScrollStyle = {
			zIndex: 5,
			height: "calc(100vh - 75px)"
		};
	}

	if (themeSetting.sidebarTransParentValue === "on") {
		sidebar = {
			backgroundImage: `linear-gradient(0deg,rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.9)),url(${themeSetting.transparentImage})`,
			backgroundRepeat: "no-repeat, repeat",
			backgroundPosition: "center",
			backgroundSize: "cover",
			width: mini ? miniDrawerWidth : drawerWidth,
			"@media (max-width: 991.98px)": {
				width: mini ? 0 : drawerWidth
			}
		};
	} else {
		sidebar = {
			width: mini ? miniDrawerWidth : drawerWidth,
			background: sidebarTheme.backgroundColor,
			"@media (max-width: 991.98px)": {
				width: mini ? 0 : drawerWidth
			}
		};
	}

	const closeIcon = {
		"@media (max-width: 991.98px)": {
			display: "block"
		}
	};

	if (mini) {
		listNameStyle = {
			opacity: miniDrawerWidth === drawerWidth ? 1 : 0,
			transform:
				miniDrawerWidth === drawerWidth
					? "translateZ(0)"
					: "translate3d(-25px,0,0)"
		};
	} else {
		listNameStyle = {
			opacity: !mini ? 1 : 0,
			transform: !mini ? "translateZ(0)" : "translate3d(-25px,0,0)"
		};
	}

	useEffect(() => {
		let sidebarDataL = sidebarData;
		if (!props.authData.isLogin) {
			sidebarDataL = [];
			return (
				<div>
					{window.location.href = '/login'}
				</div>
			);
		} else {
            firebase.analytics().logEvent('login', "login successfully!");
			let permissionsArray = props.authData.permissions;
			var sidebarTotal = sidebarData.length - 1;
			for (var i = sidebarTotal; i >= 0; i--) {
				if (sidebarDataL[i].child != null) {
					for (var v = sidebarDataL[i].child.length - 1; v >= 0; v--) {
						if (sidebarDataL[i].child[v].child != null) {
							for (var j = sidebarDataL[i].child[v].child.length - 1; j >= 0; j--) {
								if (!permissionsArray.includes(sidebarDataL[i].child[v].child[j].permission)) {
									sidebarDataL[i].child[v].child.splice(j, 1);
									//j--;
								}
							}
						}
						if (!permissionsArray.includes(sidebarDataL[i].child[v].permission)) {
							sidebarDataL[i].child.splice(v, 1);
							//v--;
						}

					}
				}

				if (!permissionsArray.includes(sidebarDataL[i].permission)) {
					sidebarDataL.splice(i, 1);
					//i--;
				}
			}
		}
		setSidebarLocal(sidebarDataL);
	}, [props.authData.permissions]);


	const drawerMiniMethod = () => {
		if (mini) {
			props.sidebarMini("off");
		} else {
			props.sidebarMini("on");
		}
	};


	const userSignout = () => {
		props.history.push("/login");
		props.logout();

	};


	return (
		<SidebarWrapper
			themeSetting={themeSetting}
			sidebarTheme={sidebarTheme}
			layoutTheme={layoutTheme}
			mini={mini}
			miniDrawerWidth={miniDrawerWidth}
			drawerWidth={drawerWidth}
			color={props.authData.subColor}
		>
			{!mini && <div className="sidebar-overlay" onClick={closeDrawer()}></div>}
			<div
				id="sidebar"
				className="sidebar sideBack"
				style={sidebar}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<div className="sidebar-header" style={{ background: props.authData.mainColor, height: 66, width: 80 }}>
					<NavLink to={"/"}>
						<div>
							<img style={{ width: 70 }} src={blobToObjectURL(props.authData?.logo?.data, props.authData?.logo_mime)} alt="react-logo" />
						</div>
					</NavLink>
				</div>
				<div
					className="close-drawer-icon"
					style={closeIcon}
					onClick={closeDrawer()}
				>
					<i className="fas fa-times-circle" />
				</div>
				<Scrollbars
					autoHide
					style={sideScrollStyle}
					renderThumbVertical={({ style, ...props }) => (
						<div {...props} className="sidebar-scrollbar-style" />
					)}
					renderThumbHorizontal={({ style, ...props }) => <div {...props} />}
					renderTrackVertical={({ style, ...props }) => (
						<div
							{...props}
							style={{
								...style,
								zIndex: 5,
								position: "absolute",
								width: "6px",
								right: "2px",
								bottom: "2px",
								top: "2px",
								borderRadius: "3px"
							}}
						/>
					)}
				>
					<div className="sidebar-wrapper" style={{ position: "relative", left: 80, paddingRight: 70 }}>
						<div style={{ background: props.authData.mainColor, position: "fixed", height: "calc(100% - 60px)", width: 80, zIndex: 999, left: 0, display: 'flex', flexDirection: "column" }}>
							<ul className="sidebar-list" style={{ listStyle: "none", padding: 0 }}>
								<li className="custom-active" onClick={() => drawerMiniMethod()} style={{ display: 'flex', justifyContent: "center", padding: 20, borderBottom: "1px solid rgb(255 255 255 / 0.1)", borderTop: "1px solid rgb(255 255 255 / 0.1)", cursor: "pointer" }}><img src={grid} /></li>
								<li style={{ display: 'flex', justifyContent: "center", padding: 20, borderBottom: "1px solid rgb(255 255 255 / 0.1)", cursor: "pointer" }}><img src={message} /></li>
								<li style={{ display: 'flex', justifyContent: "center", padding: 20, borderBottom: "1px solid rgb(255 255 255 / 0.1)", cursor: "pointer" }}><img src={assign} /></li>
							</ul>
							<div className="pl-10" style={{ marginTop: "auto", paddingBottom: 50 }}>
								<div style={{ textAlign: "center", marginBottom: 20 }}>
									<img src={question} />
								</div>
								<div id="profile" style={{ textAlign: "center" }}>
									<img
										className="top-header-profile-class"
										src={avatarUser}
										alt="notify"
										style={{ width: 50, height: 50, borderRadius: "50%" }}
									/>
								</div>
								<UncontrolledPopover
									className="roy-menu"
									innerClassName="roy-inner-content"
									placement="right-end"
									target="profile"
									trigger="legacy"
								>
									<PopoverBody>
										<div
											className="roy-menu-list"
										>
											<img style={{ marginRight: 20 }} src={online} alt="" /> Online
                                        </div>
										<div
											className="roy-menu-list"
										>
											<img style={{ marginRight: 20 }} src={idle} alt="" /> Idle
                                        </div>
										<div
											className="roy-menu-list"
											onClick={userSignout}
										>
											<img style={{ marginRight: 20 }} src={busy} alt="" /> Busy
                                        </div>
										<div
											className="roy-menu-list"
										>
											<img style={{ marginRight: 20 }} src={invisible} alt="" /> Invisible
                                        </div>
										<div
											className="roy-menu-list"
											onClick={() => props.history.push('/profile')}
										>
											<img style={{ marginRight: 20 }} src={user} alt="" /> User profile
                                        </div>
										<div
											className="roy-menu-list"
										>
											<img style={{ marginRight: 20 }} src={lock} alt="" /> Change passowrd
                                        </div>
										<div
											className="roy-menu-list"
											onClick={userSignout}
										>
											<img style={{ marginRight: 20 }} src={logoutIcon} alt="" /> Logout
                                        </div>
									</PopoverBody>
								</UncontrolledPopover>
							</div>
						</div>
						<ul className="nav nav-container">
							{sidebarDataLocal.map((list, i) => {
								return (
									<Fragment key={i}>

										{list.type && list.type === "heading" ? (
											(!mini || miniDrawerWidth === drawerWidth) && (
												<div className="sidelist-header-name">
													{
														<Fragment>
															<IntlMessages id={list.name} />
															{list.hasOwnProperty("isNew") && list["isNew"] && (
																<span
																	style={{
																		right: "23px"
																	}}
																	className="new-update-tag fs-13 bold-text"
																>
																	New
																</span>
															)}
														</Fragment>
													}
												</div>
											)
										) : (
												<NavList
													listNameStyle={listNameStyle}
													list={list}
													mini={mini}
													miniDrawerWidth={miniDrawerWidth}
													drawerWidth={drawerWidth}
													{...props}
												/>
											)}
									</Fragment>
								);
							})}
						</ul>
						<p className="versioning">
							IHP Nucleus {process.env.REACT_APP_LAUNCH}.{process.env.REACT_APP_SPRINT}{process.env.REACT_APP_HOTFIX}
						</p>
					</div>
				</Scrollbars>
			</div>
		</SidebarWrapper>
	);
};

const mapStateToProps = state => {
	return {
		authData: {
			token: state.auth.accessToken,
			isLogin: state.auth.isLogin,
			permissions: state.auth.allowedRoutes,
			mainColor: state.auth.mainColor,
			logo: state.auth.logo,
			subColor: state.auth.subColor,
			logo_mime: state.auth.logo_mime,
		},


	};
};

export default connect(mapStateToProps, {
	sidebarMini, logout
})(Radium(Sidebar));
