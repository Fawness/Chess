class ChessGame {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedPiece = null;
        this.validMoves = [];
        this.moveHistory = [];
        this.capturedPieces = { white: [], black: [] };
        this.gameOver = false;
        this.boardFlipped = false;
        this.difficulty = 'beginner';
        this.lastEvent = 'general'; // Track last event for dialogue
        this.characterDialogue = {
            beginner: {
                general: [
                    "Welcome to chess! I'm here to help you learn the game. Let's start with the basics!",
                    "Great move! You're learning quickly.",
                    "Remember, the goal is to checkmate your opponent's king.",
                    "Don't worry about mistakes - they're part of learning!",
                    "You're doing well! Keep practicing.",
                    "That's a good start! Chess is all about thinking ahead.",
                    "Nice piece development! You're getting the hang of this.",
                    "Remember to protect your king - it's the most important piece!",
                    "You're showing real promise! Keep up the good work.",
                    "Learning chess takes time, but you're making great progress!",
                    "That's a smart move! You're thinking strategically.",
                    "Don't be afraid to experiment - that's how you learn!",
                    "You're starting to understand the game better!",
                    "Keep practicing and you'll get even better!",
                    "I'm impressed with your improvement!"
                ],
                aiGeneral: [
                    "My turn! Let me show you a good move.",
                    "I'll try to make a strong move here.",
                    "Let me develop my pieces properly.",
                    "I'm thinking about my next move.",
                    "This should be an interesting position.",
                    "I'll try to control the center.",
                    "Let me protect my pieces.",
                    "I'm planning my strategy.",
                    "This move should help my position.",
                    "I'll try to create some threats."
                ],
                captures: {
                    low: [
                        "Good capture! Taking pawns helps control the center.",
                        "Nice job! Every piece counts in chess.",
                        "That's a smart exchange! You're learning well.",
                        "Good tactical thinking! Keep it up."
                    ],
                    high: [
                        "Excellent capture! Taking a major piece is a big advantage!",
                        "Wow! That's a great tactical move!",
                        "You're really getting the hang of this!",
                        "That's a brilliant capture! Well done!"
                    ]
                },
                aiCaptures: {
                    low: [
                        "I captured your pawn! That helps me control the center.",
                        "Taking your pawn gives me better position.",
                        "I got your pawn! Every piece counts.",
                        "That pawn capture helps my strategy."
                    ],
                    high: [
                        "I captured your piece! That's a big advantage for me.",
                        "Got your piece! That should help my position.",
                        "I took your piece! This gives me the upper hand.",
                        "That's a good capture for me!"
                    ]
                },
                check: [
                    "Check! You're putting pressure on my king!",
                    "Good move! You're learning to attack!",
                    "Check! You're starting to think like a chess player!",
                    "Nice attack! You're getting aggressive!"
                ],
                aiCheck: [
                    "Check! I'm putting pressure on your king!",
                    "Check! You'll need to defend your king.",
                    "Check! I'm attacking your king!",
                    "Check! You need to get out of this!"
                ],
                gameOver: {
                    win: [
                        "Congratulations! You've won! You're really improving!",
                        "Well done! You've checkmated me! Great game!",
                        "You won! You're becoming a strong chess player!",
                        "Excellent! You've mastered the basics!"
                    ],
                    lose: [
                        "Good game! You're learning quickly.",
                        "Don't worry! Every loss is a learning opportunity.",
                        "You played well! Keep practicing and you'll improve.",
                        "Good effort! You're getting better with each game."
                    ],
                    draw: [
                        "A draw! That was a well-fought game.",
                        "Good game! You're learning to defend well.",
                        "A tie! You're showing good defensive skills.",
                        "Well played! You're becoming more strategic."
                    ]
                }
            },
            easy: {
                general: [
                    "You're getting the hang of this! Let's try some more advanced strategies.",
                    "Good thinking! Planning ahead is key in chess.",
                    "Try to control the center of the board.",
                    "You're improving with each game!",
                    "Nice tactical play!",
                    "That's a solid move! You're developing your pieces well.",
                    "You're starting to see the bigger picture!",
                    "Good job protecting your pieces!",
                    "You're learning to think several moves ahead!",
                    "That's a nice combination! You're getting creative.",
                    "You're showing good positional understanding!",
                    "Keep up the good work! You're making progress.",
                    "That's a smart defensive move!",
                    "You're starting to play with purpose!",
                    "Nice work! You're building a strong position.",
                    "You're getting better at spotting opportunities!"
                ],
                aiGeneral: [
                    "My turn! I'll try to make a strong move.",
                    "Let me think about the best move here.",
                    "I'll try to improve my position.",
                    "This should be an interesting move.",
                    "Let me develop my pieces properly.",
                    "I'm planning my strategy carefully.",
                    "This move should help my position.",
                    "I'll try to create some threats.",
                    "Let me control the center.",
                    "I'm thinking several moves ahead."
                ],
                captures: {
                    low: [
                        "Good capture! You're controlling the board well.",
                        "Nice tactical move! You're thinking ahead.",
                        "That's a smart exchange! You're improving.",
                        "Good job! You're developing your position."
                    ],
                    high: [
                        "Excellent capture! You're gaining a material advantage!",
                        "Brilliant move! You're really understanding the game!",
                        "That's a great tactical decision! Well played!",
                        "Outstanding! You're showing real chess skill!"
                    ]
                },
                aiCaptures: {
                    low: [
                        "I captured your pawn! That helps my position.",
                        "Taking your pawn gives me better control.",
                        "I got your pawn! Every piece counts.",
                        "That pawn capture improves my position."
                    ],
                    high: [
                        "I captured your piece! That's a big advantage.",
                        "Got your piece! That should help me win.",
                        "I took your piece! This gives me the upper hand.",
                        "That's a good capture for my position!"
                    ]
                },
                check: [
                    "Check! You're putting me under pressure!",
                    "Good attack! You're learning to be aggressive!",
                    "Check! You're developing your attacking skills!",
                    "Nice move! You're controlling the game!"
                ],
                aiCheck: [
                    "Check! I'm putting you under pressure!",
                    "Check! You'll need to defend carefully.",
                    "Check! I'm attacking your king!",
                    "Check! You need to get out of this!"
                ],
                gameOver: {
                    win: [
                        "Congratulations! You've won a great game!",
                        "Well played! You've checkmated me!",
                        "Excellent! You're becoming a strong player!",
                        "Great game! You've earned this victory!"
                    ],
                    lose: [
                        "Good game! You're showing real improvement.",
                        "Well played! You're learning from each game.",
                        "Don't give up! You're getting better.",
                        "Good effort! Keep practicing and you'll win next time."
                    ],
                    draw: [
                        "A well-fought draw! You're playing well.",
                        "Good game! You're showing defensive skill.",
                        "A tie! You're becoming more strategic.",
                        "Well played! You're holding your own."
                    ]
                }
            },
            medium: {
                general: [
                    "Now we're playing some real chess! Let's see what you've got.",
                    "Interesting position. What's your plan?",
                    "You're holding your own against me!",
                    "This is getting exciting!",
                    "You're making me work for this win.",
                    "Not bad... for a human. But can you keep it up?",
                    "You think you're clever, don't you?",
                    "I've seen worse moves, I suppose.",
                    "You're not completely hopeless... yet.",
                    "That move was... acceptable. Barely.",
                    "You're starting to annoy me with these moves.",
                    "I expected you to make more mistakes by now.",
                    "You're not as terrible as I thought you'd be.",
                    "Don't get too confident - you're still losing.",
                    "You're making this slightly interesting, I'll give you that.",
                    "I'm starting to wonder if you actually know what you're doing."
                ],
                aiGeneral: [
                    "My turn. Let me show you how it's done.",
                    "I'll make a move that should impress you.",
                    "Let me demonstrate proper chess.",
                    "I'll try to make this interesting.",
                    "My move should improve my position.",
                    "Let me think about the best move.",
                    "I'll make a strong move here.",
                    "This should be a good move.",
                    "Let me develop my pieces properly.",
                    "I'll try to control the center."
                ],
                captures: {
                    low: [
                        "Taking a pawn? How... predictable.",
                        "You think that's impressive? It's just a pawn.",
                        "Fine, take the pawn. See if I care.",
                        "That's the best you can do? A pawn capture?"
                    ],
                    high: [
                        "Hmph. You got lucky with that capture.",
                        "Don't get too excited. It was just one piece.",
                        "You think that makes you good? Think again.",
                        "Fine, you captured a piece. Big deal."
                    ]
                },
                aiCaptures: {
                    low: [
                        "I took your pawn. Don't act surprised.",
                        "Your pawn is mine now. Deal with it.",
                        "I captured your pawn. What did you expect?",
                        "Your pawn is gone. Better luck next time."
                    ],
                    high: [
                        "I captured your piece. That should hurt.",
                        "Got your piece! Don't cry about it.",
                        "I took your piece. You should have protected it.",
                        "Your piece is mine now. Tough luck."
                    ]
                },
                check: [
                    "Check? You're starting to get annoying.",
                    "Oh, you put me in check. How original.",
                    "Check. Whatever. I can handle it.",
                    "You think that's a good move? Think again."
                ],
                aiCheck: [
                    "Check! You're in trouble now.",
                    "Check! You'll need to defend that.",
                    "Check! I'm putting pressure on you.",
                    "Check! You better watch your king."
                ],
                gameOver: {
                    win: [
                        "You won? Hmph. You got lucky this time.",
                        "Fine, you beat me. Don't let it go to your head.",
                        "You won. I suppose even a broken clock is right twice a day.",
                        "Congratulations, I guess. You won't be so lucky next time."
                    ],
                    lose: [
                        "I won. As expected.",
                        "You lose. What a surprise.",
                        "Checkmate. You're still not good enough.",
                        "Game over. You need more practice."
                    ],
                    draw: [
                        "A draw? How... unsatisfying.",
                        "A tie. I suppose that's better than losing to you.",
                        "Draw. At least you didn't embarrass yourself completely.",
                        "A stalemate. How anticlimactic."
                    ]
                }
            },
            hard: {
                general: [
                    "Think you can beat me? Let's see what you're made of.",
                    "That was... predictable. Try something more creative.",
                    "You're going to need to do better than that.",
                    "Is that really your best move?",
                    "I expected more from you.",
                    "Your moves are so obvious, it's almost boring.",
                    "Do you even know what you're doing?",
                    "I've seen children play better than this.",
                    "You're making this too easy for me.",
                    "That's the best you can come up with? Pathetic.",
                    "You're not even trying to challenge me.",
                    "I'm starting to feel bad for you... almost.",
                    "Your strategy is as weak as your moves.",
                    "You call that chess? I call it a waste of time.",
                    "Maybe you should stick to simpler games.",
                    "I'm beginning to question your intelligence."
                ],
                aiGeneral: [
                    "My turn. Let me show you real chess.",
                    "I'll make a move that should intimidate you.",
                    "Let me demonstrate proper strategy.",
                    "I'll try to make this educational for you.",
                    "My move should improve my position.",
                    "Let me think about the best move.",
                    "I'll make a strong move here.",
                    "This should be a good move.",
                    "Let me develop my pieces properly.",
                    "I'll try to control the center."
                ],
                captures: {
                    low: [
                        "You captured a pawn? How thrilling.",
                        "Wow, a pawn capture. I'm so impressed.",
                        "You think that's worth celebrating? It's just a pawn.",
                        "Taking a pawn? How... strategic of you."
                    ],
                    high: [
                        "You got lucky with that capture.",
                        "Don't get too excited. It was just one piece.",
                        "You think that makes you good? Pathetic.",
                        "Fine, you captured something. Big deal."
                    ]
                },
                aiCaptures: {
                    low: [
                        "I took your pawn. Don't act surprised.",
                        "Your pawn is mine now. Deal with it.",
                        "I captured your pawn. What did you expect?",
                        "Your pawn is gone. Better luck next time."
                    ],
                    high: [
                        "I captured your piece. That should hurt.",
                        "Got your piece! Don't cry about it.",
                        "I took your piece. You should have protected it.",
                        "Your piece is mine now. Tough luck."
                    ]
                },
                check: [
                    "Check? You're starting to get on my nerves.",
                    "Oh, you put me in check. How clever.",
                    "Check. Whatever. I can handle anything you throw at me.",
                    "You think that's impressive? Think again."
                ],
                aiCheck: [
                    "Check! You're in trouble now.",
                    "Check! You'll need to defend that.",
                    "Check! I'm putting pressure on you.",
                    "Check! You better watch your king."
                ],
                gameOver: {
                    win: [
                        "You won? Impossible. You must have cheated.",
                        "You beat me? I refuse to believe this.",
                        "You won. This is clearly a glitch in the system.",
                        "Congratulations, I suppose. You won't be so lucky again."
                    ],
                    lose: [
                        "I won. As I expected.",
                        "You lose. What a shock.",
                        "Checkmate. You're still not worthy.",
                        "Game over. You need decades more practice."
                    ],
                    draw: [
                        "A draw? How disappointing.",
                        "A tie. I suppose that's the best you can hope for.",
                        "Draw. At least you didn't completely embarrass yourself.",
                        "A stalemate. How... unsatisfying."
                    ]
                }
            },
            expert: {
                general: [
                    "You dare challenge me? Prepare to be humiliated.",
                    "Your moves are like a child's scribbles.",
                    "I've seen better play from a beginner.",
                    "You're wasting my time with these moves.",
                    "Maybe you should stick to checkers.",
                    "You're not even worth my full attention.",
                    "This is embarrassing... for you.",
                    "I'm starting to feel sorry for how bad you are.",
                    "Your chess knowledge is as shallow as your thinking.",
                    "You're making me question why I agreed to this.",
                    "I've played against better opponents in my sleep.",
                    "Your moves are so bad, they're almost impressive.",
                    "You're not even trying to hide your incompetence.",
                    "I'm beginning to think you're doing this on purpose.",
                    "Your lack of skill is almost artistic in its consistency.",
                    "You're making me look good by comparison.",
                    "I've seen better chess played by a random number generator.",
                    "Your understanding of chess is as deep as a puddle.",
                    "You're not just bad at chess - you're bad at being bad at chess.",
                    "I'm starting to wonder if you know the rules at all."
                ],
                aiGeneral: [
                    "My turn. Let me show you how real chess is played.",
                    "I'll make a move that should humiliate you.",
                    "Let me demonstrate proper chess strategy.",
                    "I'll try to make this educational for you.",
                    "My move should improve my position.",
                    "Let me think about the best move.",
                    "I'll make a strong move here.",
                    "This should be a good move.",
                    "Let me develop my pieces properly.",
                    "I'll try to control the center."
                ],
                captures: {
                    low: [
                        "You captured a pawn? How... thrilling.",
                        "A pawn capture. I'm so impressed. Not.",
                        "You think that's worth mentioning? It's just a pawn.",
                        "Taking a pawn? How strategic of you. Not."
                    ],
                    high: [
                        "You got lucky with that capture. Don't get excited.",
                        "Don't celebrate. It was just one piece.",
                        "You think that makes you good? You're still terrible.",
                        "Fine, you captured something. Don't let it go to your head."
                    ]
                },
                aiCaptures: {
                    low: [
                        "I took your pawn. Don't act surprised.",
                        "Your pawn is mine now. Deal with it.",
                        "I captured your pawn. What did you expect?",
                        "Your pawn is gone. Better luck next time."
                    ],
                    high: [
                        "I captured your piece. That should hurt.",
                        "Got your piece! Don't cry about it.",
                        "I took your piece. You should have protected it.",
                        "Your piece is mine now. Tough luck."
                    ]
                },
                check: [
                    "Check? You're really starting to annoy me.",
                    "Oh, you put me in check. How original.",
                    "Check. Whatever. I can handle anything you do.",
                    "You think that's impressive? You're still terrible."
                ],
                aiCheck: [
                    "Check! You're in trouble now.",
                    "Check! You'll need to defend that.",
                    "Check! I'm putting pressure on you.",
                    "Check! You better watch your king."
                ],
                gameOver: {
                    win: [
                        "You won? This is clearly a system error.",
                        "You beat me? I refuse to accept this result.",
                        "You won. This must be a bug in the program.",
                        "Congratulations, I guess. You won't be so lucky ever again."
                    ],
                    lose: [
                        "I won. As expected from the beginning.",
                        "You lose. What a complete shock.",
                        "Checkmate. You're still not even close to my level.",
                        "Game over. You need centuries more practice."
                    ],
                    draw: [
                        "A draw? How utterly disappointing.",
                        "A tie. I suppose that's the best someone like you can hope for.",
                        "Draw. At least you didn't completely humiliate yourself.",
                        "A stalemate. How... completely unsatisfying."
                    ]
                }
            }
        };
        
        this.initializeGame();
        this.setupEventListeners();
        this.updateCharacterDialogue();
    }

    initializeBoard() {
        const board = [];
        for (let row = 0; row < 8; row++) {
            board[row] = [];
            for (let col = 0; col < 8; col++) {
                board[row][col] = null;
            }
        }

        // Set up initial piece positions
        const initialSetup = {
            0: ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
            1: ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
            6: ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
            7: ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
        };

        for (let row in initialSetup) {
            for (let col = 0; col < 8; col++) {
                board[row][col] = {
                    piece: initialSetup[row][col],
                    color: row < 2 ? 'black' : 'white'
                };
            }
        }

        return board;
    }

    initializeGame() {
        this.renderBoard();
        this.updateTurnIndicator();
        this.updateStatusMessage();
    }

    setupEventListeners() {
        try {
            const chessboard = document.getElementById('chessboard');
            const newGameBtn = document.getElementById('new-game-btn');
            const undoBtn = document.getElementById('undo-btn');
            const flipBoardBtn = document.getElementById('flip-board-btn');
            const difficultySelect = document.getElementById('difficulty');

            // Debug: Check if elements exist
            if (!chessboard) {
                console.error('Chessboard element not found');
                return;
            }
            if (!newGameBtn) {
                console.error('New game button not found');
                return;
            }
            if (!undoBtn) {
                console.error('Undo button not found');
                return;
            }
            if (!flipBoardBtn) {
                console.error('Flip board button not found');
                return;
            }
            if (!difficultySelect) {
                console.error('Difficulty select not found');
                return;
            }

            console.log('Setting up event listeners...');

            chessboard.addEventListener('click', (e) => {
                if (e.target.classList.contains('square')) {
                    this.handleSquareClick(e.target);
                }
            });

            newGameBtn.addEventListener('click', () => {
                console.log('New game button clicked');
                this.newGame();
            });
            
            undoBtn.addEventListener('click', () => {
                console.log('Undo button clicked');
                this.undoMove();
            });
            
            flipBoardBtn.addEventListener('click', () => {
                console.log('Flip board button clicked');
                this.flipBoard();
            });
            
            difficultySelect.addEventListener('change', (e) => {
                console.log('Difficulty changed to:', e.target.value);
                this.difficulty = e.target.value;
                this.updateCharacterDialogue();
            });

            console.log('Event listeners set up successfully');
        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
    }

    renderBoard() {
        const chessboard = document.getElementById('chessboard');
        chessboard.innerHTML = '';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = 'square';
                square.dataset.row = row;
                square.dataset.col = col;

                const displayRow = this.boardFlipped ? 7 - row : row;
                const displayCol = this.boardFlipped ? 7 - col : col;

                if ((displayRow + displayCol) % 2 === 0) {
                    square.classList.add('light');
                } else {
                    square.classList.add('dark');
                }

                const piece = this.board[displayRow][displayCol];
                if (piece) {
                    square.textContent = piece.piece;
                    square.dataset.piece = piece.piece;
                    square.dataset.color = piece.color;
                }

                chessboard.appendChild(square);
            }
        }
    }

    handleSquareClick(square) {
        if (this.gameOver) return;

        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        const displayRow = this.boardFlipped ? 7 - row : row;
        const displayCol = this.boardFlipped ? 7 - col : col;

        const piece = this.board[displayRow][displayCol];

        // Clear previous selections
        this.clearHighlights();

        if (this.selectedPiece) {
            // Try to move to this square
            if (this.isValidMove(this.selectedPiece.row, this.selectedPiece.col, displayRow, displayCol)) {
                this.makeMove(this.selectedPiece.row, this.selectedPiece.col, displayRow, displayCol);
                this.selectedPiece = null;
                this.validMoves = [];
            } else {
                // Select new piece if clicking on own piece
                if (piece && piece.color === this.currentPlayer) {
                    this.selectPiece(displayRow, displayCol);
                } else {
                    this.selectedPiece = null;
                    this.validMoves = [];
                }
            }
        } else {
            // Select piece if clicking on own piece
            if (piece && piece.color === this.currentPlayer) {
                this.selectPiece(displayRow, displayCol);
            }
        }
    }

    selectPiece(row, col) {
        this.selectedPiece = { row, col };
        this.validMoves = this.getValidMoves(row, col);
        this.highlightSquare(row, col, 'selected');
        this.highlightValidMoves();
    }

    clearHighlights() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.classList.remove('selected', 'valid-move', 'check');
        });
    }

    highlightSquare(row, col, className) {
        const displayRow = this.boardFlipped ? 7 - row : row;
        const displayCol = this.boardFlipped ? 7 - col : col;
        const square = document.querySelector(`[data-row="${displayRow}"][data-col="${displayCol}"]`);
        if (square) {
            square.classList.add(className);
        }
    }

    highlightValidMoves() {
        this.validMoves.forEach(move => {
            this.highlightSquare(move.row, move.col, 'valid-move');
        });
    }

    isValidMove(fromRow, fromCol, toRow, toCol) {
        return this.validMoves.some(move => 
            move.row === toRow && move.col === toCol
        );
    }

    getValidMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];

        const moves = [];
        const pieceType = piece.piece;

        switch (pieceType) {
            case '♙': // White pawn
                moves.push(...this.getPawnMoves(row, col, 'white'));
                break;
            case '♟': // Black pawn
                moves.push(...this.getPawnMoves(row, col, 'black'));
                break;
            case '♖': case '♜': // Rook
                moves.push(...this.getRookMoves(row, col));
                break;
            case '♘': case '♞': // Knight
                moves.push(...this.getKnightMoves(row, col));
                break;
            case '♗': case '♝': // Bishop
                moves.push(...this.getBishopMoves(row, col));
                break;
            case '♕': case '♛': // Queen
                moves.push(...this.getQueenMoves(row, col));
                break;
            case '♔': case '♚': // King
                moves.push(...this.getKingMoves(row, col));
                break;
        }

        // Filter out moves that would put own king in check
        return moves.filter(move => !this.wouldPutKingInCheck(row, col, move.row, move.col));
    }

    getBasicMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];

        const moves = [];
        const pieceType = piece.piece;

        switch (pieceType) {
            case '♙': // White pawn
                moves.push(...this.getPawnMoves(row, col, 'white'));
                break;
            case '♟': // Black pawn
                moves.push(...this.getPawnMoves(row, col, 'black'));
                break;
            case '♖': case '♜': // Rook
                moves.push(...this.getRookMoves(row, col));
                break;
            case '♘': case '♞': // Knight
                moves.push(...this.getKnightMoves(row, col));
                break;
            case '♗': case '♝': // Bishop
                moves.push(...this.getBishopMoves(row, col));
                break;
            case '♕': case '♛': // Queen
                moves.push(...this.getQueenMoves(row, col));
                break;
            case '♔': case '♚': // King
                moves.push(...this.getKingMoves(row, col));
                break;
        }

        return moves;
    }

    getPawnMoves(row, col, color) {
        const moves = [];
        const direction = color === 'white' ? -1 : 1;
        const startRow = color === 'white' ? 6 : 1;

        // Forward move
        if (this.isValidPosition(row + direction, col) && !this.board[row + direction][col]) {
            moves.push({ row: row + direction, col });
            
            // Double move from starting position
            if (row === startRow && !this.board[row + 2 * direction][col]) {
                moves.push({ row: row + 2 * direction, col });
            }
        }

        // Diagonal captures
        for (let dCol of [-1, 1]) {
            const newRow = row + direction;
            const newCol = col + dCol;
            if (this.isValidPosition(newRow, newCol)) {
                const targetPiece = this.board[newRow][newCol];
                if (targetPiece && targetPiece.color !== color) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        }

        return moves;
    }

    getRookMoves(row, col) {
        return this.getSlidingMoves(row, col, [[0, 1], [0, -1], [1, 0], [-1, 0]]);
    }

    getBishopMoves(row, col) {
        return this.getSlidingMoves(row, col, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
    }

    getQueenMoves(row, col) {
        return [...this.getRookMoves(row, col), ...this.getBishopMoves(row, col)];
    }

    getKnightMoves(row, col) {
        const moves = [];
        const knightMoves = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1]
        ];

        for (let [dRow, dCol] of knightMoves) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            if (this.isValidPosition(newRow, newCol)) {
                const targetPiece = this.board[newRow][newCol];
                if (!targetPiece || targetPiece.color !== this.board[row][col].color) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        }

        return moves;
    }

    getKingMoves(row, col) {
        const moves = [];
        const kingMoves = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (let [dRow, dCol] of kingMoves) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            if (this.isValidPosition(newRow, newCol)) {
                const targetPiece = this.board[newRow][newCol];
                if (!targetPiece || targetPiece.color !== this.board[row][col].color) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        }

        return moves;
    }

    getSlidingMoves(row, col, directions) {
        const moves = [];
        const pieceColor = this.board[row][col].color;

        for (let [dRow, dCol] of directions) {
            let newRow = row + dRow;
            let newCol = col + dCol;

            while (this.isValidPosition(newRow, newCol)) {
                const targetPiece = this.board[newRow][newCol];
                if (!targetPiece) {
                    moves.push({ row: newRow, col: newCol });
                } else {
                    if (targetPiece.color !== pieceColor) {
                        moves.push({ row: newRow, col: newCol });
                    }
                    break;
                }
                newRow += dRow;
                newCol += dCol;
            }
        }

        return moves;
    }

    isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    wouldPutKingInCheck(fromRow, fromCol, toRow, toCol) {
        // Temporarily make the move
        const tempPiece = this.board[toRow][toCol];
        this.board[toRow][toCol] = this.board[fromRow][fromCol];
        this.board[fromRow][fromCol] = null;

        // Check if king is in check
        const isInCheck = this.isKingInCheck(this.currentPlayer);

        // Undo the move
        this.board[fromRow][fromCol] = this.board[toRow][toCol];
        this.board[toRow][toCol] = tempPiece;

        return isInCheck;
    }

    isKingInCheck(color) {
        // Find king position
        let kingRow, kingCol;
        const kingPiece = color === 'white' ? '♔' : '♚';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.board[row][col] && this.board[row][col].piece === kingPiece) {
                    kingRow = row;
                    kingCol = col;
                    break;
                }
            }
        }

        console.log(color, 'king is at position:', kingRow, kingCol);

        // Check if any opponent piece can attack the king
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color !== color) {
                    const moves = this.getBasicMoves(row, col);
                    if (moves.some(move => move.row === kingRow && move.col === kingCol)) {
                        console.log(color, 'is in check! Piece at', row, col, 'can attack king');
                        return true;
                    }
                }
            }
        }

        console.log(color, 'is not in check');
        return false;
    }

    makeMove(fromRow, fromCol, toRow, toCol, isAIMove = false) {
        const fromPiece = this.board[fromRow][fromCol];
        const toPiece = this.board[toRow][toCol];
        const movingPlayer = this.currentPlayer;

        // Record move for undo
        this.moveHistory.push({
            from: { row: fromRow, col: fromCol, piece: fromPiece },
            to: { row: toRow, col: toCol, piece: toPiece },
            player: this.currentPlayer
        });

        // Track if this is a capture
        let captureType = null;
        if (toPiece) {
            this.capturedPieces[toPiece.color].push(toPiece);
            // Determine if it's a high or low value piece
            const pieceValue = this.getPieceValue(toPiece.piece);
            captureType = pieceValue <= 1 ? 'low' : 'high';
        }

        // Make the move
        this.board[toRow][toCol] = fromPiece;
        this.board[fromRow][fromCol] = null;

        // Check for pawn promotion
        if (fromPiece.piece === '♙' && toRow === 0) {
            this.board[toRow][toCol].piece = '♕';
        } else if (fromPiece.piece === '♟' && toRow === 7) {
            this.board[toRow][toCol].piece = '♛';
        }

        // Check for game end conditions BEFORE switching players
        const nextPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        const isCheckmate = this.isCheckmateForPlayer(nextPlayer);
        const isStalemate = this.isStalemateForPlayer(nextPlayer);
        
        console.log('Move made by:', this.currentPlayer);
        console.log('Next player would be:', nextPlayer);
        console.log('Is checkmate for next player:', isCheckmate);
        console.log('Is stalemate for next player:', isStalemate);

        // Switch players
        this.currentPlayer = nextPlayer;

        // Update display
        this.renderBoard();
        this.updateTurnIndicator();
        this.updateCapturedPieces();
        this.updateStatusMessage();

        // Handle game end conditions and dialogue
        if (isCheckmate) {
            console.log('GAME OVER - CHECKMATE!');
            this.gameOver = true;
            this.updateStatusMessage();
            
            // Determine winner for dialogue
            const winner = movingPlayer === 'white' ? 'white' : 'black';
            const dialogueType = winner === 'white' ? 'win' : 'lose';
            this.updateCharacterDialogue('gameOver', dialogueType);
        } else if (isStalemate) {
            console.log('GAME OVER - STALEMATE!');
            this.gameOver = true;
            this.updateStatusMessage();
            this.updateCharacterDialogue('gameOver', 'draw');
        } else {
            console.log('Game continues, AI will move if it\'s black\'s turn');
            
            // Only handle dialogue for player moves (not AI moves)
            if (!isAIMove) {
                // Check if the move put the opponent in check
                const isCheck = this.isKingInCheck(nextPlayer);
                
                // Update dialogue based on the move
                if (captureType) {
                    // Player captured a piece
                    this.updateCharacterDialogue('captures', captureType);
                } else if (isCheck) {
                    // Player put opponent in check
                    this.updateCharacterDialogue('check');
                } else {
                    // Regular move
                    this.updateCharacterDialogue('general');
                }
            }
            
            // AI move if it's AI's turn
            if (this.currentPlayer === 'black') {
                setTimeout(() => this.makeAIMove(), 500);
            }
        }
    }

    makeAIMove() {
        const move = this.getAIMove();
        if (move) {
            // Track AI move events before making the move
            const toPiece = this.board[move.to.row][move.to.col];
            let captureType = null;
            if (toPiece) {
                const pieceValue = this.getPieceValue(toPiece.piece);
                captureType = pieceValue <= 1 ? 'low' : 'high';
            }
            
            this.makeMove(move.from.row, move.from.col, move.to.row, move.to.col, true);
            
            // Update dialogue for AI move (delayed to show after the move)
            setTimeout(() => {
                if (this.gameOver) {
                    // Game ended, dialogue already handled in makeMove
                    return;
                }
                
                // Check if AI put player in check
                const isCheck = this.isKingInCheck('white');
                
                if (captureType) {
                    // AI captured a player piece - this should trigger different dialogue
                    // The dialogue should reflect the AI's reaction to capturing the player's piece
                    this.updateCharacterDialogue('aiCaptures', captureType);
                } else if (isCheck) {
                    // AI put player in check
                    this.updateCharacterDialogue('aiCheck');
                } else {
                    // Regular AI move
                    this.updateCharacterDialogue('aiGeneral');
                }
            }, 600); // Slightly after the move animation
        }
    }

    getAIMove() {
        const possibleMoves = [];
        
        // Get all possible moves for AI
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === 'black') {
                    const moves = this.getValidMoves(row, col);
                    moves.forEach(move => {
                        possibleMoves.push({
                            from: { row, col },
                            to: move,
                            piece: piece
                        });
                    });
                }
            }
        }

        if (possibleMoves.length === 0) return null;

        // Apply difficulty-based AI logic
        switch (this.difficulty) {
            case 'beginner':
                return this.getRandomMove(possibleMoves);
            case 'easy':
                return this.getEasyMove(possibleMoves);
            case 'medium':
                return this.getMediumMove(possibleMoves);
            case 'hard':
                return this.getHardMove(possibleMoves);
            case 'expert':
                return this.getExpertMove(possibleMoves);
            default:
                return this.getRandomMove(possibleMoves);
        }
    }

    getRandomMove(moves) {
        return moves[Math.floor(Math.random() * moves.length)];
    }

    getEasyMove(moves) {
        // Prefer captures and center control
        const captureMoves = moves.filter(move => 
            this.board[move.to.row][move.to.col] !== null
        );
        
        if (captureMoves.length > 0) {
            return this.getRandomMove(captureMoves);
        }
        
        return this.getRandomMove(moves);
    }

    getMediumMove(moves) {
        // More sophisticated: prefer captures, center control, and piece development
        const captureMoves = moves.filter(move => 
            this.board[move.to.row][move.to.col] !== null
        );
        
        const centerMoves = moves.filter(move => 
            move.to.row >= 3 && move.to.row <= 4 && move.to.col >= 3 && move.to.col <= 4
        );
        
        if (captureMoves.length > 0) {
            return this.getRandomMove(captureMoves);
        }
        
        if (centerMoves.length > 0) {
            return this.getRandomMove(centerMoves);
        }
        
        return this.getRandomMove(moves);
    }

    getHardMove(moves) {
        // Even more sophisticated: evaluate piece values and position
        const scoredMoves = moves.map(move => {
            let score = 0;
            
            // Capture value
            const capturedPiece = this.board[move.to.row][move.to.col];
            if (capturedPiece) {
                score += this.getPieceValue(capturedPiece.piece);
            }
            
            // Position value
            score += this.getPositionValue(move.piece.piece, move.to.row, move.to.col);
            
            return { ...move, score };
        });
        
        scoredMoves.sort((a, b) => b.score - a.score);
        return scoredMoves[0];
    }

    getExpertMove(moves) {
        // Most sophisticated: look ahead and consider opponent's best responses
        const scoredMoves = moves.map(move => {
            let score = 0;
            
            // Immediate capture value
            const capturedPiece = this.board[move.to.row][move.to.col];
            if (capturedPiece) {
                score += this.getPieceValue(capturedPiece.piece) * 2;
            }
            
            // Position value
            score += this.getPositionValue(move.piece.piece, move.to.row, move.to.col);
            
            // Mobility (how many moves this creates)
            score += this.getMobilityValue(move);
            
            return { ...move, score };
        });
        
        scoredMoves.sort((a, b) => b.score - a.score);
        return scoredMoves[0];
    }

    getPieceValue(piece) {
        const values = {
            '♙': 1, '♟': 1,   // Pawns
            '♘': 3, '♞': 3,   // Knights
            '♗': 3, '♝': 3,   // Bishops
            '♖': 5, '♜': 5,   // Rooks
            '♕': 9, '♛': 9,   // Queens
            '♔': 1000, '♚': 1000 // Kings
        };
        return values[piece] || 0;
    }

    getPositionValue(piece, row, col) {
        // Simple position evaluation
        const centerDistance = Math.abs(3.5 - row) + Math.abs(3.5 - col);
        return (7 - centerDistance) * 0.1;
    }

    getMobilityValue(move) {
        // Temporarily make the move and count available moves
        const tempPiece = this.board[move.to.row][move.to.col];
        this.board[move.to.row][move.to.col] = move.piece;
        this.board[move.from.row][move.from.col] = null;
        
        let mobility = 0;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === 'black') {
                    mobility += this.getValidMoves(row, col).length;
                }
            }
        }
        
        // Undo the move
        this.board[move.from.row][move.from.col] = move.piece;
        this.board[move.to.row][move.to.col] = tempPiece;
        
        return mobility * 0.1;
    }

    isCheckmate() {
        return this.isCheckmateForPlayer(this.currentPlayer);
    }

    isStalemate() {
        return this.isStalemateForPlayer(this.currentPlayer);
    }

    isCheckmateForPlayer(color) {
        console.log('Checking if', color, 'is in checkmate...');
        if (!this.isKingInCheck(color)) {
            console.log(color, 'is not in check, so not checkmate');
            return false;
        }
        
        console.log(color, 'is in check, checking for escape moves...');
        
        // Check if any move can get out of check
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === color) {
                    const moves = this.getBasicMoves(row, col);
                    // Filter moves that would get out of check
                    const escapeMoves = moves.filter(move => {
                        // Temporarily make the move
                        const tempPiece = this.board[move.row][move.col];
                        this.board[move.row][move.col] = piece;
                        this.board[row][col] = null;
                        
                        // Check if still in check
                        const stillInCheck = this.isKingInCheck(color);
                        
                        // Undo the move
                        this.board[row][col] = piece;
                        this.board[move.row][move.col] = tempPiece;
                        
                        return !stillInCheck;
                    });
                    
                    if (escapeMoves.length > 0) {
                        console.log('Found escape move for', color, 'at', row, col, 'with', escapeMoves.length, 'moves');
                        return false;
                    }
                }
            }
        }
        
        console.log(color, 'is in checkmate! No escape moves found.');
        return true;
    }

    isStalemateForPlayer(color) {
        if (this.isKingInCheck(color)) return false;
        
        // Check if any move is possible
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === color) {
                    const moves = this.getBasicMoves(row, col);
                    // Filter moves that are legal (don't put own king in check)
                    const legalMoves = moves.filter(move => {
                        // Temporarily make the move
                        const tempPiece = this.board[move.row][move.col];
                        this.board[move.row][move.col] = piece;
                        this.board[row][col] = null;
                        
                        // Check if would put own king in check
                        const wouldPutInCheck = this.isKingInCheck(color);
                        
                        // Undo the move
                        this.board[row][col] = piece;
                        this.board[move.row][move.col] = tempPiece;
                        
                        return !wouldPutInCheck;
                    });
                    
                    if (legalMoves.length > 0) return false;
                }
            }
        }
        
        return true;
    }

    newGame() {
        console.log('Starting new game...');
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedPiece = null;
        this.validMoves = [];
        this.moveHistory = [];
        this.capturedPieces = { white: [], black: [] };
        this.gameOver = false;
        this.boardFlipped = false;
        this.lastEvent = 'general';
        
        // Clear existing dialogue bubbles
        const bubblesContainer = document.querySelector('.dialogue-bubbles');
        bubblesContainer.innerHTML = '';
        
        this.renderBoard();
        this.updateTurnIndicator();
        this.updateStatusMessage();
        this.updateCapturedPieces();
        this.updateCharacterDialogue('general');
        console.log('New game started successfully');
    }

    undoMove() {
        console.log('Attempting to undo move...');
        if (this.moveHistory.length === 0) {
            console.log('No moves to undo');
            return;
        }
        
        const lastMove = this.moveHistory.pop();
        
        // Restore the board state
        this.board[lastMove.from.row][lastMove.from.col] = lastMove.from.piece;
        this.board[lastMove.to.row][lastMove.to.col] = lastMove.to.piece;
        
        // Restore captured piece if there was one
        if (lastMove.to.piece) {
            this.capturedPieces[lastMove.to.piece.color].pop();
        }
        
        // Switch back to previous player
        this.currentPlayer = lastMove.player;
        this.gameOver = false;
        
        this.renderBoard();
        this.updateTurnIndicator();
        this.updateStatusMessage();
        this.updateCapturedPieces();
        console.log('Move undone successfully');
    }

    flipBoard() {
        console.log('Flipping board...');
        this.boardFlipped = !this.boardFlipped;
        this.renderBoard();
        console.log('Board flipped successfully');
    }

    updateTurnIndicator() {
        const turnElement = document.getElementById('current-turn');
        turnElement.textContent = this.currentPlayer === 'white' ? 'White' : 'Black';
        turnElement.style.color = this.currentPlayer === 'white' ? '#e74c3c' : '#2c3e50';
    }

    updateStatusMessage() {
        const statusElement = document.getElementById('status-message');
        
        if (this.gameOver) {
            // Determine the winner based on who just moved
            const lastPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
            if (this.isCheckmateForPlayer(this.currentPlayer)) {
                const winner = lastPlayer === 'white' ? 'White' : 'Black';
                statusElement.textContent = `Checkmate! ${winner} wins!`;
            } else if (this.isStalemateForPlayer(this.currentPlayer)) {
                statusElement.textContent = 'Stalemate! The game is a draw.';
            }
        } else if (this.isKingInCheck(this.currentPlayer)) {
            statusElement.textContent = `${this.currentPlayer === 'white' ? 'White' : 'Black'} is in check!`;
        } else {
            statusElement.textContent = 'Game in progress';
        }
    }

    updateCapturedPieces() {
        const capturedWhite = document.querySelector('.captured-white');
        const capturedBlack = document.querySelector('.captured-black');
        
        capturedWhite.innerHTML = this.capturedPieces.white.map(piece => 
            `<span class="captured-piece">${piece.piece}</span>`
        ).join('');
        
        capturedBlack.innerHTML = this.capturedPieces.black.map(piece => 
            `<span class="captured-piece">${piece.piece}</span>`
        ).join('');
    }

    updateCharacterDialogue(eventType = 'general', subType = null) {
        const characterImg = document.getElementById('character-img');
        
        // Update character image based on difficulty
        characterImg.src = `characters/${this.difficulty}.png`;
        
        // Add error handling for missing images
        characterImg.onerror = function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 200px;
                height: 200px;
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                font-weight: bold;
                text-align: center;
            `;
            fallback.textContent = this.src.split('/').pop().replace('.png', '').toUpperCase();
            this.parentNode.insertBefore(fallback, this);
        };
        
        // Get dialogue based on event type
        const dialogues = this.characterDialogue[this.difficulty];
        let dialogueArray;
        
        if (eventType === 'gameOver') {
            dialogueArray = dialogues.gameOver[subType]; // win, lose, or draw
        } else if (eventType === 'captures') {
            dialogueArray = dialogues.captures[subType]; // low or high - player capturing AI pieces
        } else if (eventType === 'aiCaptures') {
            // AI capturing player pieces - use different dialogue
            dialogueArray = dialogues.aiCaptures[subType]; // low or high
        } else if (eventType === 'check') {
            dialogueArray = dialogues.check; // player putting AI in check
        } else if (eventType === 'aiCheck') {
            dialogueArray = dialogues.aiCheck; // AI putting player in check
        } else if (eventType === 'aiGeneral') {
            dialogueArray = dialogues.aiGeneral; // AI general moves
        } else {
            dialogueArray = dialogues.general; // player general moves
        }
        
        const randomDialogue = dialogueArray[Math.floor(Math.random() * dialogueArray.length)];
        
        // Add new dialogue bubble
        this.addDialogueBubble(randomDialogue);
        
        // Store the last event for reference
        this.lastEvent = eventType;
    }

    addDialogueBubble(text) {
        const bubblesContainer = document.querySelector('.dialogue-bubbles');
        const bubbles = bubblesContainer.querySelectorAll('.dialogue-bubble');
        
        // If we have 3 bubbles, remove the oldest one with fade out animation
        if (bubbles.length >= 3) {
            const oldestBubble = bubbles[0];
            oldestBubble.classList.add('fade-out');
            
            setTimeout(() => {
                oldestBubble.remove();
            }, 300);
        }
        
        // Create new bubble
        const newBubble = document.createElement('div');
        newBubble.className = 'dialogue-bubble new';
        newBubble.textContent = text;
        
        // Add to container
        bubblesContainer.appendChild(newBubble);
        
        // Make it visible after a short delay for animation
        setTimeout(() => {
            newBubble.classList.add('visible');
            newBubble.classList.remove('new');
        }, 50);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log('Initializing chess game...');
        window.chessGame = new ChessGame();
        console.log('Chess game initialized successfully');
    } catch (error) {
        console.error('Error initializing chess game:', error);
    }
}); 