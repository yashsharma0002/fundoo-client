/**
 * @description
 * @author Yash
 * @since 8/12/18
 * @version 1.0
 */
import React from 'react'
import { Popper, Paper, MenuItem, IconButton } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';

/**
 * @description Class Component to get color selection process done
 * @exports exporting class component
 */
export default class ColorSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showColorPopper: false,
            colorSelected: ""
        }
        this.handleShowColorPopper = this.handleShowColorPopper.bind(this);
        this.handleColorClick = this.handleColorClick.bind(this);
    }


    handleShowColorPopper = placement => event => {
        const { currentTarget } = event;
        this.setState(state => ({
            anchorEl: currentTarget,
            open: state.placement !== placement || !state.open,
            placement,
        }));
    }


    handleColorClick = (event, colorCodeSelected) => {
        this.setState({
            colorSelected: colorCodeSelected,
        });

        console.log('color selected');
        console.log(this.state.colorSelected);
        
        
    };

    render() {

        const colorPaletteClassName = [
            {
                colorClass: "colorPaletteWhite",
                colorCode: "rgb(255, 255, 255)",
                colorName: "White"
            },
            {
                colorClass: "colorPaletteRed",
                colorCode: "rgb(255, 0, 0)",
                colorName: "Red"
            },
            {
                colorClass: "colorPalettePurple",
                colorCode: "rgb(128, 0, 128)",
                colorName: "Purple"
            },
            {
                colorClass: "colorPalettePink",
                colorCode: "rgb(255, 192, 203)",
                colorName: "Pink"
            },
            {
                colorClass: "colorPaletteTeal",
                colorCode: "rgb(0, 128, 128)",
                colorName: "Teal"
            },
            {
                colorClass: "colorPaletteOrange",
                colorCode: "rgb(255, 165, 0)",
                colorName: "Orange"
            },
            {
                colorClass: "colorPaletteDarkBlue",
                colorCode: "rgb(0, 0, 139)",
                colorName: "Dark Blue"
            },
            {
                colorClass: "colorPaletteGray",
                colorCode: "rgb(128, 128, 128)",
                colorName: "Gray"
            },
            {
                colorClass: "colorPaletteBlue",
                colorCode: "rgb(0, 0, 255)",
                colorName: "Blue"
            },
            {
                colorClass: "colorPaletteBrown",
                colorCode: "rgb(165, 42, 42)",
                colorName: "Brown"
            },
            {
                colorClass: "colorPaletteYellow",
                colorCode: "rgb(255, 255, 0)",
                colorName: "Yellow"
            },
            {
                colorClass: "colorPaletteGreen",
                colorCode: "rgb(0, 128, 0)",
                colorName: "Green"
            }
        ]

        // key={option}
        // disabled={index === 0}
        // selected={index === this.state.selectedIndex}
        // onClick={event => this.handleMenuItemClick(event, index)}

        return (
            <span>
                <Popper open={this.state.open} anchorEl={this.state.anchorEl} placement={this.state.placement} transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper className="colorSelectionPopperNoteAddCard"  >
                                <div >
                                    {colorPaletteClassName.map((option, index) => (
                                        <IconButton className={option.colorClass}
                                            title={option.colorName}
                                            // onSelect = {index === }
                                            onClick = { event => this.handleColorClick(event, option.colorCode)}
                                        ></IconButton>
                                    ))}
                                </div>
                            </Paper>
                        </Fade>
                    )}
                </Popper>
                <img onClick={this.handleShowColorPopper('bottom')} className="noteAddFeatureImages" src={require('../assets/images/color.svg')} alt="color" />
            </span>
        )
    }
}