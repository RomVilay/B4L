import * as React from 'react';
import Svg, { Defs, RadialGradient, Stop, G, Circle, Path, Text, TSpan } from 'react-native-svg'

function SvgGo(props) {
	return (
		<Svg width={263.991} height={263.991} {...props}>
			<Defs>
				<RadialGradient
					id="go_svg__a"
					cx={0.5}
					cy={0.5}
					r={0.5}
					gradientTransform="rotate(22.48 .498 .499)"
					gradientUnits="objectBoundingBox">
					<Stop offset={0} stopColor="#56cbff" />
					<Stop offset={0.186} stopColor="#49afe2" />
					<Stop offset={0.586} stopColor="#28699a" />
					<Stop offset={0.946} stopColor="#092655" />
				</RadialGradient>
				<RadialGradient
					id="go_svg__b"
					cx={0.5}
					cy={0.5}
					r={0.5}
					gradientUnits="objectBoundingBox">
					<Stop offset={0.93} stopColor="#000503" />
					<Stop offset={0.94} stopColor="#010807" />
					<Stop offset={0.952} stopColor="#051015" />
					<Stop offset={0.965} stopColor="#0b1f2d" />
					<Stop offset={0.978} stopColor="#14334e" />
					<Stop offset={0.991} stopColor="#204d77" />
					<Stop offset={1} stopColor="#296197" />
				</RadialGradient>
			</Defs>
			<G data-name="go" transform="translate(-104 -567)">
				<Circle
					data-name="Ellipse 5"
					cx={131.995}
					cy={131.995}
					transform="translate(104 567)"
					opacity={0.5}
					fill="url(#go_svg__a)"
					style={{
						mixBlendMode: 'screen',
						isolation: 'isolate',
					}}
					r={131.995}
				/>
				<Path
					data-name="Trac\xE9 36"
					d="M503.816 1200.089l92.162-33.544a129.754 129.754 0 014.412 16.516zm-159.429-11.529a131.422 131.422 0 00-1.476 17.028h98.044zm.963 45.141a129.692 129.692 0 004.412 16.516l92.162-33.544zm-2.439-22.528a131.418 131.418 0 001.476 17.028l96.568-17.028zm32.2 82.879a131.429 131.429 0 0012.084 12.083l63.017-75.1zm-23.442-38.587a129.776 129.776 0 007.235 15.488l84.927-49.032zm10.032 20.322a130.875 130.875 0 009.819 13.99l75.1-63.019zm25.499-165.161a131.248 131.248 0 00-12.084 12.084l75.1 63.016zm38.587-23.443a129.768 129.768 0 00-15.488 7.235l49.032 84.927zm21.763-6.323a129.457 129.457 0 00-16.516 4.412l33.544 92.162zm-97.788 85.683a129.744 129.744 0 00-4.412 16.516l96.574 17.028zm120.316 9.921v-98.044a131.261 131.261 0 00-17.028 1.476zm-78.6 133.262a130.762 130.762 0 0013.989 9.819l49.03-84.922zm-32.567-163.918a129.7 129.7 0 00-7.235 15.488l92.162 33.544zm12.615-18.823a130.869 130.869 0 00-9.819 13.99l84.923 49.03zm33.941-29.77a130.736 130.736 0 00-13.989 9.82l63.018 75.1zm181.368 173.737a130 130 0 007.235-15.488l-92.161-33.544zm-12.616 18.823a130.868 130.868 0 009.819-13.99l-84.922-49.029zm21.762-39.559a129.7 129.7 0 004.412-16.516l-96.574-17.028zm-37.437 55.918a131.345 131.345 0 0012.084-12.083l-75.1-63.017zm44.288-100.546a131.411 131.411 0 00-1.476-17.028l-96.568 17.028zm-1.476 22.612a131.311 131.311 0 001.476-17.028h-98.046zm-81.4 101.377a129.727 129.727 0 0015.488-7.236l-49.033-84.926zm-49.876 8.762V1240.3l-17.028 96.568a131.4 131.4 0 0017.026 1.472zm5.585 0a131.392 131.392 0 0017.027-1.476l-17.029-96.563zm-44.629-6.851a129.689 129.689 0 0016.516 4.412l17.028-96.574zm67.157 4.412a129.716 129.716 0 0016.516-4.412l-33.544-92.163zm42.085-16.355a130.782 130.782 0 0013.99-9.819l-63.018-75.1zm-129.977 2.8a129.671 129.671 0 0015.488 7.236l33.544-92.161zm65.364-243.921v98.044l17.025-96.568a131.255 131.255 0 00-17.027-1.479zm108.373 62.554a130.724 130.724 0 00-9.819-13.989L499.114 1190zm10.032 20.321a130.021 130.021 0 00-7.235-15.488l-84.926 49.032zm-23.443-38.586a131.24 131.24 0 00-12.084-12.084l-63.017 75.1zm-16.36-15.676a130.744 130.744 0 00-13.99-9.82l-49.029 84.922zm-18.823-12.617a129.771 129.771 0 00-15.488-7.235l-33.545 92.161zm-20.736-9.145a129.448 129.448 0 00-16.516-4.412l-17.028 96.574z"
					transform="translate(-237.24 -509.751)"
					opacity={0.4}
					fill="url(#go_svg__b)"
					style={{
						mixBlendMode: 'screen',
						isolation: 'isolate',
					}}
				/>
				<G
					transform="translate(104 567)"
					filter="url(#go_svg__c)"
					style={{
						mixBlendMode: 'overlay',
						isolation: 'isolate',
					}}>
					<Text
						data-name="GO"
						transform="translate(131.98 182.98)"
						fill="#56adce"
						fontSize={130}
						fontFamily="DINCondensed-Bold, DIN Condensed"
						fontWeight={700}>
						<TSpan x={-55.38} y={0}>
							{'GO'}
						</TSpan>
					</Text>
				</G>
				<G
					transform="translate(104 567)"
					filter="url(#go_svg__d)"
					style={{
						mixBlendMode: 'overlay',
						isolation: 'isolate',
					}}>
					<Text
						data-name="GO"
						transform="translate(131.98 182.98)"
						fill="#56adce"
						fontSize={130}
						fontFamily="DINCondensed-Bold, DIN Condensed"
						fontWeight={700}>
						<TSpan x={-55.38} y={0}>
							{'GO'}
						</TSpan>
					</Text>
				</G>
			</G>
		</Svg>
	);
}

export default SvgGo