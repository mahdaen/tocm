/*jshint strict:true*/
/*jshint boss:true*/
/*jshint undef:false*/

(function(window, $global, $fonts, $media, $frame, TocmClass) {
    'use strict';
    // Turning Off auto-write mode to increase performance.
    TocmConfig.autowrite = false;
    
    // Creating Media Queries Collections.
    // Best fit for Mobile Phone Display.
    $media('mobile', '(max-width: 509px) and (min-device-width: 1024px), (max-device-width: 480px) and (orientation: portrait)');
    // Best fit for Tablet Display.
    $media('tablet', '(max-width: 989px) and (min-device-width: 1024px), screen and (max-device-width: 480px), ' + 
           '(max-device-width: 480px) and (orientation: landscape), (max-device-width: 1024px) and ' + 
           '(min-device-width: 481px) and (orientation: portrait)');
    // Best fit for Laptop display;
    $media('desktop', 'all and (min-width: 1000px)');
    // Best fit for Medium Size display.
    $media('medium-desktop', 'all and (min-width: 1300px)');
    // Best fit for large display.
    $media('large-desktop', 'all and (min-width: 1600px)');
    // Creating Fonts Lists.
    var fl = {
        book: ['font/gotham.book.eot', 'font/gotham.book.ttf', 'font/gotham.book.woff'],
        bold: ['font/gotham.bold.eot', 'font/gotham.bold.ttf', 'font/gotham.bold.woff'],
        medium: ['font/gotham.medium.eot', 'font/gotham.medium.ttf', 'font/gotham.medium.woff'],
        light: ['font/gotham.light.eot', 'font/gotham.light.ttf', 'font/gotham.light.woff']
    };
    // Adding Fonts.
    $fonts('Gotham Book', fl.book);
    $fonts('Gotham Bold', fl.bold);
    $fonts('Gotham Medium', fl.medium);
    $fonts('Gotham Light', fl.light);
    
    // GLOBAL CLASSES --------->> //
    // Resetting Margin.
    $global('body', {height: 'auto', width: '100%'});
    $global('body, section, div, span, nav, input, ul, li, a, h2', {
        margin: 0, padding: 0, box_sizing: 'border-box', _moz_box_sizing: 'border-box'
    });
    $global('a', {text_decoration: 'none'});
    
    // Defining half-size box.
    $global('.half-width', {width: '50%', height: '100%', float: 'left'});
    // Defining container class.
    $global('.container', {display: 'block', width: '100%', max_width: 960, margin: '0 auto'});
    $global('.small-text', {font_family: 'Gotham Book', font_size: 11});
    $global('.small-button', {padding: 10});
    $global('.text-input', {padding: 7, width: 200, border: '1px solid #ccc'});
    $global('.noclear', {clear: 'none'}).on('before&after', {content: '""', display: 'table'});
    
    // PRIVATE CLASSESS --------->> //
    // ----- TOOLBOX ----- //
    // Hide Toolbox on mobile display. //
    $global('.tool-wrapper', {transition: 'opacity .25s ease-in', display: 'none'}, 'mobile'); //--> @MEDIA-QUERIES --> MOBILE.
    $class('.tool-wrapper', {
        background_color: '#fff', box_shadow: '0 1px 1px 0 #ccc', height: 32,
        // Setting up Toolbox.
        '.half-width': {
            font_family: 'Gotham Book', font_size: 11, color: '#004a1d',
            height: 32, line_height: 32, position: 'relative', z_index: '999999'
        },
        '.left': {
           width: '40%'
        },
        '.right': {
           width: '60%'
        }
   });
    
    // TOOLBOX MENU //
    $class('.tool-menu', {height: 32, text_align: 'right', display: 'inline-block', float: 'right'})
        .add('.button', {
            height: 32, border_left: '1px solid #ccc', display: 'inline-block',
            color: '#004a1d', font_family: 'Gotham Bold', font_size: 10,
            padding_left: 10, padding_right: 10, position: 'relative', float: 'left'
        }).on('hover', {background_image: linear_gradient('360deg, #fff, #f3f3f3')})
            .add('img & span', {vertical_align: 'middle'})
        .back()
    .back()
        .add('.button.end', {border_right: '1px solid #ccc'})
    .back()
        // SEARCH BUTTON AND INPUT PROPERTIES //
        .add('.search', {
            padding_left: 8, padding_right: 0
        })
    .back()
        .add('.search-input', {
            font_size: 12, font_family: 'Gotham Book',
            padding_left: 30, margin: 0, margin_top: 3, position: 'relative', width: 20, border: 'none', cursor: 'hand',
            background: 'none', background_image: 'url("img/ic_search.png")', background_repeat: 'no-repeat', background_position: '7px 7px',
            transition: 'all .25s linear'
        }).on('focus', {
            width: 256, margin_right: 7, outline: 'none', transition: 'all .25s linear'
        })
    .back();

    // ----- HEADER ----- //
    $class('.header', {
        background_image: 'url("img/hd_bg.png")', height: 34 + 120, overflow: 'hidden', position: 'relative', z_index: '999999'
    })
        .add('.nav-wrapper & .wrapper & .logo-wrapper & .nav-area & .header-cart', {
            transition: 'all .3s ease-in'
        })
    .back()
        // LOGO & NAVIGATION PROPERTIES //
        .add('.logo-wrapper & .nav-area', {
            height: 120, float: 'left'
        })
    .back()
        // LOGO PROPERTIES //
        .add('.logo-wrapper', {
            width: 330, text_align: 'center'
        })
            .add('.logo', {
                max_width: '100%', margin_top: 40
            })
        .back()
    .back();
    
    // ----- HEADER ON TABLET ----- //
    $class('.header', {
        height: 'auto'
    }, 'tablet')
        .add('#tool-title', {padding_left: 10})
    .back()
        .add('.nav-wrapper & .wrapper & .logo-wrapper & .nav-area & .header-cart', {
            display: 'block', width: '100%', height: '100%', clear: 'both', transition: 'all .3s linear'
        })
    .back()
        .add('.logo-wrapper', {
            height: 'auto', padding: 10
        })
            .add('.logo', {margin: 0})
        .back()
    .back()
        .add('.nav-area', {
            text_align: 'center', border: 'none'
        })
            .add('.top-nav & .scd-nav', {
                display: 'block', margin: 0, padding: 10, text_align: 'center'
            })
        .back()
            .add('.main-nav', {
                margin: '0 !important'
            })
        .back()
    .back()
        .add('.header-cart', {
            top: 0, padding: 20
        })
            .add('.cart-button', {
                margin: '0 auto'
            })
        .back()
    .back();

    // NAVIGATION PROPERTIES //
    $class('.nav-wrapper', {height: 120})
        .add('.wrapper', {height: 120})
    .back()
        .add('.nav-area', {
            width: 630, float: 'left', border_left: '1px solid #ccc', box_shadow: '-1px 0 1px 0 #fff'
        })
            .add('.top-nav & .scd-nav', {
                height: '50%', text_align: 'right', margin_right: 60, padding_right: 20
            })
        .back()
            .add('.top-nav', {
                border_bottom: '1px solid #ccc'
            })
        .back()
            .add('.main-nav', {margin_top: 30})
                .add('.item', {
                    margin: 3, padding: 7, font_family: 'Gotham Medium', font_size: 13, color: '#000', transition: 'all .3s ease-in'
                }).on('hover', {
                    text_shadow: '0 1px #fff', box_shadow: '0 0 0px 1px #ccc', border_radius: 3,
                    background_image: linear_gradient('180deg, #f9f9f9, #f2f2f2'), color: '#666',
                    transition: 'all .3s ease-in'
                })
                    .add('.m-arrow', {margin_left: 3})
                .back()
            .back()
        .back()
            .add('.sub-nav', {})
                .add('.item', {
                    padding: 3, margin: 0, font_family: 'Gotham Book', font_size: 12, color: '#000'
                }).on('after', {
                    content: '""', border_right: '1px solid #666', 'margin-left':10
                }).on('hover', {color: '#004a1d', text_shadow: '0 1px #fff'})
            .back()
                .add('.item.close', {
                    margin_right: 10
                })
                .on('after', {
                    display: 'none'
                })
        .back()
    .back();
    
    // NAVIGATION ON MOBILE //
    $class('.header', {
        border_top: '2px solid #ccc'
    }, 'mobile')
        .add('.nav-area', {
            padding: 0, border: 'none'
        })
            .add('.top-nav', {
                padding: '0 !important'
            })
        .back()
            .add('.main-nav .item', {
                display: 'block', margin: 10, padding: 10,
                background_image: linear_gradient('180deg, #f9f9f9, #f2f2f2'), box_shadow: '0 0 0 1px #ccc'
            })
            .on('hover', {
                background_image: linear_gradient('360deg, #f9f9f9, #f2f2f2'), box_shadow: '0 0 0 3px #ccc'
            })
        .back()
            .add('.sub-nav .item', {
                padding: 5,
                background_image: linear_gradient('180deg, #f9f9f9, #f2f2f2'), box_shadow: '0 0 0 1px #ccc'
            })
            .on('after', {
                display: 'none'
            })
            .on('hover', {
                background_image: linear_gradient('360deg, #f9f9f9, #f2f2f2'),
                transition: 'all .25s ease-in'
            })
        .back()
    .back();
    
    // CART BUTTON //
    $class('.header-cart', {
        width: 60, max_width: 960, margin: '0 auto', position: 'relative', top: -96, float: 'right',
        text_align: 'center',
        
        '.cart-button': {
            background_color: '#fff', width: 60, height: 60, display: 'block',
            border_radius: 4, border: '1px solid #ccc', transition: 'all .25s ease-in',
            hover: {
                background_image: linear_gradient('360deg, #f5f5f5, #fff'), box_shadow: '0 3px 1px 0px #ccc',
                transition: 'all .25s ease-in'
            },
            
            '.cart-count': {
                position: 'relative', top: -2
            },
            '.number': {
                width: 20, height: 20, display: 'inline-block', line_height: 19,
                font_family: 'Gotham Medium', font_size: 10, color: '#333', background_color: '#fff',
                position: 'relative', top: -10, border_radius: 20, border: '1px solid #ccc'
            },
            '.cart-image': {
                position: 'relative', top: -6
            }
        }
    });

    // SLIDE SHOW PROPERTIES //
    $class('.headline', {
        min_height: 456, width: '100%', position: 'relative',
        '.background': {
            content: '""', display: 'block', position: 'relative', top: 0, left: 0, width: '100%', min_height: 456,
            background_image: 'url(img/slide/1.jpg)', background_position: '0 50%',
            transition: 'all 1.5s ease-in-out 0.3s'
        },
        
        // SLIDE SHOW CONTROLLER -->
        '.arrow-nav': {
            user_select: 'none',
            // GLOBAL PREV AND NEXT ARROW -->
            'span': {
                width: 54, height: 54, position: 'absolute', top: '45%', cursor: 'pointer', z_index: 1000,
                after: {
                    content: '""', position: 'absolute', width: 44, height: 44, top: 5, left: 5
                }
            },
            // PREV ARROW -->
            '.prev': {
                left: 20,
                after: {
                    background_image: 'url("img/slide/prev.png")'
                }
            },
            // NEXT ARROW -->
            '.next': {
                right: 20,
                after: {
                    background_image: 'url("img/slide/next.png")'
                }
            }
        },
        
        // GLOBAL SLIDE ITEM PROPERTIES -->
        '.item-wrapper': {
            position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, overflow: 'hidden',
            // ITEM PROPERTIES -->
            '.slide-item': {
                display: 'block', width: '100%', height: '100%', position: 'relative',
                max_width: 960, margin: '0 auto', transition: 'all .4s ease-in-out'
            },
            // INACTIVE ITEM PROPERTIES -->
            '.inactive': {
                opacity: 0, left: '-100%', position: 'absolute', transition: 'all .4s ease-in-out'
            },
            // GLOBAL ITEM PROPERTIES -->
            '.title & .detail & .info & .image & .ruller': {
                position: 'absolute', color: '#fff', display: 'inline-block'
            },
            // RIGHT AREA PROPERTIES -->
            '.title & .detail & .info & .ruller': {
                left: '40%', z_index: 800
            },
            '.title & .detail & .info & .ruller@tablet': {
                left: '16%', z_index: 800
            },
            // LEFT AREA PROPERTIES --->
            '.image': {
                left: '10%', top: '10%',
                'img': {
                    max_width: 256
                }
            },
            '.image@tablet': {
                display: 'none'
            },
            // ITEM PROPERTIES -->
            '.title': {
                top: 112, font_family: 'Georgia', font_size: 23, font_weight: 400
            },
            '.detail': {
                top: 152, font_family: 'Gotham Book', font_size: 23
            },
            '.ruller': {
                top: 196, color: 'transparent', height: 5, width: '60%', max_width: 512,
                background_color: rgb('#fff', 0.5)
            },
            '.info': {
                top: 200,
                '.info-child': {
                    display: 'block', padding_top: 16, padding_bottom: 10
                },
                '.label & .text': {
                    font_size: 15, float: 'left'
                },
                '.label': {
                    font_family: 'Gotham Bold'
                },
                '.text': {
                    font_family: 'Gotham Book', margin_left: 10
                }
            }
        },
        // HELPER PROPERTIES -->
        '.helper': {
            background_color: '#fff', display: 'inline-block', position: 'absolute', border: '1px solid #ccc',
            right: 0, bottom: -50, width: 80, height: 156, border_right: 'none', box_shadow: '0 1px 1px 1px #ccc',
            background_image: linear_gradient('270deg, #f4f4f4, #ccc'),
            
            '.helper-wrapper': {
                position: 'relative', padding_top: 34,
                
                '.question': {
                    position: 'absolute', top: '55%', right: '-50%',
                    transform: 'rotate(90deg)', font_family: 'Gotham Bold', font_size: 19
                },
                '.icon': {
                    clear: 'both', display: 'block', padding: 5, padding_left: 20
                }
            }
        }
    });
    $class('.headline@mobile', {
        display: 'none', transition: 'all .3s ease-in'
    });
    
    // CONTENT ON TABLET //
    $class('.content@tablet', {
        padding_left: 10, padding_right: 10
    });
    
    // BADGES -->
    $class('.badges', {
        position: 'relative', margin_top: 66, margin_bottom: 66, height: 72,
        border: '1px solid #ccc', box_shadow: '0 4px 0 -1px #ccc',
        
        // TEXT PROPERTIES -->
        '.left & .right': {
            width: '50%', float: 'left', padding: 16, font_family: 'Gotham Light', font_size: 32
        },
        
        // RESIZE FONT ON TABLET -->
        '.left & .right@tablet': {
            font_family: 'Gotham Medium', font_size: 18, padding_top: 22
        },
        
        '.left': {
            text_align: 'right', padding_right: 90
        },
        '.left@tablet': {
            padding_right: 72
        },
        '.right': {
            text_align: 'left', padding_left: 90
        },
        '.right@tablet': {
            padding_left: 72
        },
        '.image': {
            position: 'absolute', background_image: 'url(img/badge.png)', width: '100%', height: 151,
            background_repeat: 'no-repeat', background_position: '50% 0', top: -40
        },
        '.image@tablet': {
            background_size: 128, top: -28
        }
    });
    $class('.badges@mobile', {
        display: 'none', transition: 'all .3s ease-in'
    });
    
    // WHATS NEW PROPERTIES -->
    $class('.whatsnew', {
        position: 'relative', margin_bottom: 20,
        '.slide-header': {
            padding_top: 10, padding_bottom: 10, border_bottom: '3px solid #ccc', margin_bottom: 20,
            position: 'relative',
            
            '.title': {
                font_family: 'Gotham Medium', font_size: 19, font_weight: 'normal'
            },
            '.control': {
                '.left & .right': {
                    position: 'absolute', top: 8,
                    width: 27, height: 27, cursor: 'pointer', display: 'block'
                },
                '.left': {
                    background_image: 'url(img/p_nav.png)', right: 33
                },
                '.right': {
                    background_image: 'url(img/n_nav.png)', right: 0
                }
            }
        },
        '.slide_4': {
            overflow: 'hidden', height: 'auto', white_space: 'nowrap', font_size: 0,
            
            '.item': {
                display: 'inline-block', padding_right: 20, position: 'relative',
                width: '25%', word_spacing: 0, margin_right: 6, transition: 'all .4s ease-in-out',
                hover: {
                    margin_right: 30, transition: 'all .4s ease-in-out', opacity: 0.7
                },
                
                '.thumbnail img': {
                    width: '100%',
                    hover: {
                        box_shadow: '0 2px 2px #333', transition: 'all .2s ease-in-out'
                    }
                },
                '.info-wrapper': {
                    display: 'block',
                    
                    '.name & .detail & .price': {
                        padding_top: 8, color: '#333'
                    },
                    '.name': {
                        font_family: 'Georgia', font_size: 14
                    },
                    '.detail': {
                        font_family: 'Gotham Book', font_size: 16
                    },
                    '.price': {
                        font_family: 'Gotham Book', font_size: 12
                    }
                }
            },
            // TABLET -->
            '.item@tablet': {
                width: '50%', margin_right: 20
            },
            '.start': {
                left: 0
            }
        }
    });

    // WHATS NEW PROPERTIES -->
    $class('.popular', {
        position: 'relative', margin_bottom: 20,
        '.slide-header': {
            padding_top: 10, padding_bottom: 10, border_bottom: '3px solid #ccc', margin_bottom: 20,
            position: 'relative',
            
            '.title': {
                font_family: 'Gotham Medium', font_size: 19, font_weight: 'normal'
            },
            '.control': {
                '.left & .right': {
                    position: 'absolute', top: 8,
                    width: 27, height: 27, cursor: 'pointer', display: 'block'
                },
                '.left': {
                    background_image: 'url(img/p_nav.png)', right: 33
                },
                '.right': {
                    background_image: 'url(img/n_nav.png)', right: 0
                }
            }
        },
        '.slide_4': {
            overflow: 'hidden', height: 'auto', white_space: 'nowrap', font_size: 0,
            
            '.item': {
                display: 'inline-block', padding_right: 10, position: 'relative',
                width: '12.5%', word_spacing: 0, margin_right: 1.5, transition: 'all .4s ease-in-out',
                
                '.thumbnail img': {
                    width: '100%'
                },
                
                hover: {
                    margin_left: 20, margin_right: 20, transition: 'all .4s ease-in-out', opacity: 0.7
                }
            },
            // TABLET -->
            '.item@tablet': {
                width: '25%', margin_right: 4
            },
            '.start': {
                left: 0
            }
        }
    });
    
    // BOTTOM CONTAINER PROPERTIES -->
    $class('.bottom', {
        padding_top: 30, margin_top: 30, text_align: 'center', border_top: '1px solid #ccc', padding_bottom: 20,
        // QUICK INFO -->
        '.quick-info': {
            padding_bottom: 20,
            
            '.text': {
                font_family: 'Georgia', font_size: 42, font_weight: 400, margin_bottom: 20, padding: 10
            },
            '.link': {
                padding: 20, font_family: 'Gotham Book', font_size: 17, display: 'block', width: 320,
                margin: '0 auto', color: '#004a1d', transition: 'all .2s ease-in',
                hover: {
                    background_color: '#00978c', transition: 'all .2s ease-in', color: '#fff', border_radius: 15, box_shadow: '0 1px 1px 1px #317c76'
                }
            }
        },
        // TWEETER INFO -->
        '.tweet': {
            position: 'relative', background_image: linear_gradient('90deg, #2ba9e1 0%, #2ba9e1 50%, #034c1f 50%, #034c1f 100%'), margin_top: 30, clear: 'both',
            
            '.container': {
                background_color: '#034c1f', height: '100%', padding_left: 156, position: 'relative',
                
                '.left': {
                    position: 'absolute', width: 156, height: '100%', left: 0, top: 0, background_color: '#2ba9e1',
                    'img': {
                        position: 'absolute', right: 40, top: '15%'
                    },
                    after: {
                        content: '" "', position: 'absolute', top: '20%', right: 0, width: 0, height: 0,
                        border: '15px solid #034c1f', border_left: '15px solid transparent', border_bottom: '15px solid transparent'
                    }
                },
                '.right': {
                    width: '100%', height: '100%', position: 'relative', text_align: 'left', padding: 20,
                    
                    '.tweet-text': {
                        font_family: 'Gotham Book', font_size: 19, color: '#fff', padding: 20, padding_bottom: 15, padding_top: 10
                    },
                    '.tweet-go': {
                        font_family: 'Gotham Medium', font_size: 11, color: '#818181', padding: 10, padding_left: 0, margin_left: 20, transition: 'all .2s ease-in-out',
                        hover: {
                            color: '#fff', border_bottom: '1px dashed #ccc', transition: 'all .2s ease-in-out'
                        }
                    }
                }
            }
        },
        
        // TWEETER ON TABLET AND MOBILE -->
        '.tweet@mobile': {
            display: 'none !important'
        },
        
        
        // FOOTER -->
        '.footer': {
            background_image: 'url(img/bbg.png)', height: 244,
            
            '.footer-wrapper': {
                text_align: 'left', padding_top: 50, 
                
                '.office-wrapper': {
                    width: '30%', float: 'left',
                    
                    '.title': {
                        margin_bottom: 36
                    },
                    '.address & .phone & .copy': {
                        font_family: 'Gotham Book', font_size: 12, margin_top: 10
                    },
                    '.social': {
                        margin_top: 30, opacity: 1,
                        'img': {
                            transition: 'opacity .3s ease-in-out',
                            hover: {
                                opacity: 0.6, transition: 'opacity .3s ease-in-out',
                                drop_shadow: '0 0 2px #333'
                            }
                        }
                    },
                    '.copy': {
                        margin_top: 30
                    }
                },
                '.contact-wrapper': {
                    width: '70%', float: 'right', height: '100%', padding: 10,
                    
                    '.label': {
                        font_family: 'Gotham Book', font_size: 12, padding_top: 5, margin_bottom: 20
                    },
                    '.itext': {
                        width: '100%', padding: 10, border: 'none', margin_bottom: 6, color: '#000',
                        font_family: 'Gotham Book', font_size: 12, transition: 'all .3s ease-in-out',
                        box_sizing: 'border-box',
                        focus: {
                            outline: 0, box_shadow: '0 0 0 2px #00c4ff', transition: 'all .3s ease-in-out'
                        },
                        hover: {
                            outline: 0, box_shadow: '0 0 0 2px #41cbc0', transition: 'all .3s ease-in-out'
                        }
                    },
                    '.c-left': {
                        width: '40%', float: 'left'
                    },
                    '.c-right': {
                        width: '60%', float: 'left', padding_left: 6,
                        
                        '.textarea': {
                            width: '75%', height: 72, float: 'left', box_sizing: 'border_box'
                        },
                        '.submit': {
                            width: '22%', float: 'left', margin_left: 6, height: 72, box_sizing: 'border-box',
                            border: 'none', background_color: '#00978c', color: '#fff', box_shadow: '0 2px 1px 1px #ccc',
                            font_family: 'Gotham Medium', font_size: 17, transition: 'all .3s ease-in-out',
                            
                            hover: {
                                box_shadow: '0px 1px 2px 0px #41cbc0', transition: 'all .3s ease-in-out'
                            }
                        }
                    }
                }
            }
        },
        
        // FOOTER ON TABLET AND MOBILE -->
        '.footer@tablet': {
            height: 'auto',
            '.footer-wrapper': {
                padding_top: '10px !important'
            },
            '.office-wrapper & .contact-wrapper': {
                display: 'block', width: '100% !important', float: 'none !important', text_align: 'center', padding: 10
            },
            '.contact-wrapper': {
                margin_bottom: '20px !important' , margin_top: 20,
                
                '.c-left & .c-right & .textarea & .submit': {
                    width: '100% !important', float: 'none !important', margin: '0 !important', padding: '10px !important', margin_bottom: '6px !important'
                },
                '.textarea & .submit': {
                    
                }
            }
        },
        
        // SUPPORTER -->
        '.ads': {
            height: 128, text_align: 'right',
            
            'a': {
                padding_left: 10, padding_right: 10, position: 'relative', top: 30, right: 10
            }
        },
        '.ads@mobile': {
            height: 'auto', text_align: 'center', padding_bottom: 30
        }
    });
    
    // NOTIFICATION PROPERTIES -->
    $class('!.notice', {
        width: 250, padding: 10, font_family: 'Gotham Book', font_size: 12, color: '#555', opacity: 0, transition: 'opacity .3s ease-in',
        position: 'absolute', left: 20, top: 20, background_color: '#fcfcfc', box_shadow: '0 0 0 2px red', z_index: 999999999,
        '.title': {
            margin_bottom: 5, font_weight: 600, color: '#ff9300'
        }
    });
    $class('!.scroller', {
        cursor: 'pointer', width: 33, height: 33, padding: 3, position: 'fixed', right: 10, bottom: 10, z_index: 88888, background_color: '#fff', box_shadow: '0 0 0 1px #ccc', border_radius: 20,
        
        '.scroll-button': {
            width: 27, height: 27, background_image: 'url(img/n_nav.png)', transform: 'rotate(270deg)', display: 'block'
        }
    });
    $class('!.alert', {
        width: 250, position: 'absolute', left: '40%', top: 32, padding: 10, font_family: 'Gotham Book',
        background_color: '#68bdf2', border_radius: 4, box_shadow: '0 0 1px 3px #ccc', transition: 'all .4s ease-in-out', display: 'none',

        '.title': {
            font_family: 'Gotham Medium', font_size: 13, font_weight: 400, color: '#fff', margin_bottom: 5
        },
        '.text': {
            font_size: 11, color: '#fff'
        }
    });
    // WRITING OUT THE CLASS.
    TocmBuilder.writeSCS();
    // Turning on back auto-write mode to enable live editing.
})(window, $global, $fonts, $media, $keyframes, Tocm);

function debugLayout() {
    'use strict';
    // Debug layouts.
    $class('!*', {
        box_shadow: '0 0 0 1px red'
    }).write();
}
