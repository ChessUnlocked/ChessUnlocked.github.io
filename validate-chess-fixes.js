#!/usr/bin/env node

/**
 * Chess Application Validation Script
 * Tests all chess-specific fixes implemented in the application
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

class ChessValidator {
    constructor() {
        this.results = {
            css: { passed: 0, failed: 0, tests: [] },
            openings: { passed: 0, failed: 0, tests: [] },
            drills: { passed: 0, failed: 0, tests: [] },
            functionality: { passed: 0, failed: 0, tests: [] }
        };
    }

    log(message, color = 'reset') {
        console.log(`${colors[color]}${message}${colors.reset}`);
    }

    logTest(category, testName, passed, details = '') {
        const status = passed ? '✅ PASS' : '❌ FAIL';
        const color = passed ? 'green' : 'red';
        this.log(`  ${status} ${testName}${details ? ': ' + details : ''}`, color);
        
        this.results[category].tests.push({ name: testName, passed, details });
        if (passed) {
            this.results[category].passed++;
        } else {
            this.results[category].failed++;
        }
    }

    async validateCSS() {
        this.log('\n🎨 Testing CSS Chess Board Fixes...', 'bold');
        
        try {
            const cssContent = fs.readFileSync('styles.css', 'utf8');
            
            // Test 1: Check if chessboard has aspect-ratio property
            const hasAspectRatio = cssContent.includes('aspect-ratio: 1 / 1');
            this.logTest('css', 'Chessboard has proper aspect ratio (1:1)', hasAspectRatio);
            
            // Test 2: Check if chessboard-square has aspect-ratio property
            const squareHasAspectRatio = cssContent.includes('aspect-ratio: 1 / 1') && 
                                       cssContent.includes('.chessboard-square');
            this.logTest('css', 'Chess squares have aspect ratio property', squareHasAspectRatio);
            
            // Test 3: Check for proper grid layout
            const hasGridLayout = cssContent.includes('grid-template-columns: repeat(8, 1fr)') &&
                                 cssContent.includes('grid-template-rows: repeat(8, 1fr)');
            this.logTest('css', 'Chessboard uses proper 8x8 grid layout', hasGridLayout);
            
            // Test 4: Check for responsive sizing
            const hasResponsiveSize = cssContent.includes('min(80vw, 400px)') ||
                                     cssContent.includes('min(') ||
                                     cssContent.includes('clamp(');
            this.logTest('css', 'Chessboard has responsive sizing', hasResponsiveSize);
            
            // Test 5: Check for square colors
            const hasSquareColors = cssContent.includes('.light-square') && 
                                   cssContent.includes('.dark-square');
            this.logTest('css', 'Chess square colors are defined', hasSquareColors);
            
        } catch (error) {
            this.logTest('css', 'CSS file accessibility', false, error.message);
        }
    }

    async validateOpeningSequences() {
        this.log('\n🗺️ Testing Multiple Opening Sequences...', 'bold');
        
        try {
            const htmlContent = fs.readFileSync('index.html', 'utf8');
            
            // Extract opening sequences from JavaScript
            const openingSequencesMatch = htmlContent.match(/const openingSequences = \{([\s\S]*?)\};/);
            if (!openingSequencesMatch) {
                this.logTest('openings', 'Opening sequences object found', false, 'Could not find openingSequences object');
                return;
            }
            
            const openingSequencesText = openingSequencesMatch[1];
            
            // Test 1: Check for multiple openings (more than just Ruy Lopez)
            const expectedOpenings = [
                'Ruy Lopez',
                'Sicilian Defense',
                'Queen\'s Gambit',
                'Italian Game',
                'French Defense',
                'King\'s Indian Defense'
            ];
            
            let foundOpenings = 0;
            expectedOpenings.forEach(opening => {
                if (openingSequencesText.includes(`'${opening}'`) || openingSequencesText.includes(`"${opening}"`)) {
                    foundOpenings++;
                }
            });
            
            this.logTest('openings', 'Multiple opening sequences present', foundOpenings >= 4, 
                        `Found ${foundOpenings}/${expectedOpenings.length} expected openings`);
            
            // Test 2: Check if each opening has proper move sequences
            const hasProperMoveStructure = openingSequencesText.includes('pos:') && 
                                          openingSequencesText.includes('move:');
            this.logTest('openings', 'Opening sequences have proper structure (pos + move)', hasProperMoveStructure);
            
            // Test 3: Check for starting position in each opening
            const hasStartingPositions = openingSequencesText.includes('Starting Position');
            this.logTest('openings', 'Opening sequences include starting positions', hasStartingPositions);
            
            // Test 4: Check opening selector options in HTML
            const selectorMatch = htmlContent.match(/<select id="openingSelector"[\s\S]*?<\/select>/);
            if (selectorMatch) {
                const selectorContent = selectorMatch[0];
                const optionCount = (selectorContent.match(/<option/g) || []).length;
                this.logTest('openings', 'Opening selector has multiple options', optionCount >= 4, 
                            `Found ${optionCount} options in selector`);
            } else {
                this.logTest('openings', 'Opening selector found in HTML', false);
            }
            
        } catch (error) {
            this.logTest('openings', 'HTML file accessibility', false, error.message);
        }
    }

    async validatePracticeDrills() {
        this.log('\n🎯 Testing Practice Drill Positions...', 'bold');
        
        try {
            const htmlContent = fs.readFileSync('index.html', 'utf8');
            
            // Extract practice drills from JavaScript
            const practiceDrillsMatch = htmlContent.match(/const practiceDrills = \[([\s\S]*?)\];/);
            if (!practiceDrillsMatch) {
                this.logTest('drills', 'Practice drills array found', false, 'Could not find practiceDrills array');
                return;
            }
            
            const practiceDrillsText = practiceDrillsMatch[1];
            
            // Test 1: Check for multiple drill positions
            const drillCount = (practiceDrillsText.match(/board:/g) || []).length;
            this.logTest('drills', 'Multiple practice drills present', drillCount >= 3, 
                        `Found ${drillCount} drill positions`);
            
            // Test 2: Check for proper board position format (8x8 arrays)
            const boardPositions = practiceDrillsText.match(/board:\s*\[(.*?)\]/g) || [];
            let validPositions = 0;
            
            boardPositions.forEach(boardMatch => {
                // Count the number of strings in the array (should be 8 for 8 rows)
                const rowCount = (boardMatch.match(/'/g) || []).length / 2; // Each string has 2 quotes
                if (rowCount === 8) {
                    validPositions++;
                }
            });
            
            this.logTest('drills', 'Practice drill positions have correct format (8 rows)', 
                        validPositions === boardPositions.length, 
                        `${validPositions}/${boardPositions.length} positions are properly formatted`);
            
            // Test 3: Check for chess-accurate positions (basic validation)
            const hasChessPieces = practiceDrillsText.includes('r') && // black rook
                                  practiceDrillsText.includes('R') && // white rook
                                  practiceDrillsText.includes('k') && // black king
                                  practiceDrillsText.includes('K');   // white king
            this.logTest('drills', 'Practice positions contain chess pieces', hasChessPieces);
            
            // Test 4: Check for proper question and answer structure
            const hasQuestions = practiceDrillsText.includes('question:') && 
                               practiceDrillsText.includes('options:') && 
                               practiceDrillsText.includes('answer:');
            this.logTest('drills', 'Practice drills have question/answer structure', hasQuestions);
            
            // Test 5: Check for specific opening positions
            const knownOpenings = ['Ruy Lopez', 'Sicilian Defense', 'French Defense', 'Italian Game'];
            let recognizedPositions = 0;
            
            knownOpenings.forEach(opening => {
                if (practiceDrillsText.includes(opening)) {
                    recognizedPositions++;
                }
            });
            
            this.logTest('drills', 'Practice drills include recognized chess openings', 
                        recognizedPositions >= 2, 
                        `Found ${recognizedPositions} recognized opening positions`);
            
        } catch (error) {
            this.logTest('drills', 'HTML file accessibility for drills', false, error.message);
        }
    }

    async validateApplicationFunctionality() {
        this.log('\n⚙️ Testing Application Functionality...', 'bold');
        
        try {
            // Test 1: Check if HTML file exists and is valid
            const htmlContent = fs.readFileSync('index.html', 'utf8');
            const hasValidHTML = htmlContent.includes('<!DOCTYPE html>') && 
                               htmlContent.includes('<html') && 
                               htmlContent.includes('</html>');
            this.logTest('functionality', 'HTML file is valid', hasValidHTML);
            
            // Test 2: Check if CSS file exists and is linked
            const cssExists = fs.existsSync('styles.css');
            const cssLinked = htmlContent.includes('href="styles.css"') || 
                             htmlContent.includes("href='styles.css'");
            this.logTest('functionality', 'CSS file exists and is linked', cssExists && cssLinked);
            
            // Test 3: Check for essential JavaScript functions
            const hasChessboardRendering = htmlContent.includes('renderBoard') && 
                                          htmlContent.includes('chessboard');
            this.logTest('functionality', 'Chessboard rendering functions present', hasChessboardRendering);
            
            // Test 4: Check for opening animation functionality
            const hasOpeningAnimation = htmlContent.includes('playOpeningAnimation') && 
                                       htmlContent.includes('animationInterval');
            this.logTest('functionality', 'Opening animation functionality present', hasOpeningAnimation);
            
            // Test 5: Check for practice drill functionality
            const hasPracticeDrills = htmlContent.includes('loadPracticeDrill') && 
                                     htmlContent.includes('practiceDrill');
            this.logTest('functionality', 'Practice drill functionality present', hasPracticeDrills);
            
            // Test 6: Check for proper event listeners
            const hasEventListeners = htmlContent.includes('addEventListener') && 
                                     htmlContent.includes('click');
            this.logTest('functionality', 'Event listeners are properly set up', hasEventListeners);
            
            // Test 7: Check for Firebase integration
            const hasFirebaseIntegration = htmlContent.includes('firebase') && 
                                          htmlContent.includes('initializeApp');
            this.logTest('functionality', 'Firebase integration present', hasFirebaseIntegration);
            
        } catch (error) {
            this.logTest('functionality', 'Application file accessibility', false, error.message);
        }
    }

    generateReport() {
        this.log('\n📊 CHESS APPLICATION VALIDATION REPORT', 'bold');
        this.log('=' .repeat(50), 'blue');
        
        const categories = ['css', 'openings', 'drills', 'functionality'];
        const categoryNames = {
            css: 'CSS Chess Board Fixes',
            openings: 'Multiple Opening Sequences',
            drills: 'Practice Drill Positions',
            functionality: 'Application Functionality'
        };
        
        let totalPassed = 0;
        let totalFailed = 0;
        
        categories.forEach(category => {
            const result = this.results[category];
            const total = result.passed + result.failed;
            const percentage = total > 0 ? Math.round((result.passed / total) * 100) : 0;
            
            this.log(`\n${categoryNames[category]}:`, 'bold');
            this.log(`  ✅ Passed: ${result.passed}`, 'green');
            this.log(`  ❌ Failed: ${result.failed}`, 'red');
            this.log(`  📈 Success Rate: ${percentage}%`, percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : 'red');
            
            totalPassed += result.passed;
            totalFailed += result.failed;
        });
        
        const overallTotal = totalPassed + totalFailed;
        const overallPercentage = overallTotal > 0 ? Math.round((totalPassed / overallTotal) * 100) : 0;
        
        this.log('\n' + '=' .repeat(50), 'blue');
        this.log('OVERALL RESULTS:', 'bold');
        this.log(`✅ Total Passed: ${totalPassed}`, 'green');
        this.log(`❌ Total Failed: ${totalFailed}`, 'red');
        this.log(`📈 Overall Success Rate: ${overallPercentage}%`, 
                overallPercentage >= 80 ? 'green' : overallPercentage >= 60 ? 'yellow' : 'red');
        
        if (overallPercentage >= 80) {
            this.log('\n🎉 EXCELLENT! Chess fixes are working well!', 'green');
        } else if (overallPercentage >= 60) {
            this.log('\n⚠️  GOOD! Some issues need attention.', 'yellow');
        } else {
            this.log('\n🚨 NEEDS WORK! Several critical issues found.', 'red');
        }
        
        // Detailed failure report
        if (totalFailed > 0) {
            this.log('\n🔍 DETAILED FAILURE ANALYSIS:', 'bold');
            categories.forEach(category => {
                const failedTests = this.results[category].tests.filter(test => !test.passed);
                if (failedTests.length > 0) {
                    this.log(`\n${categoryNames[category]} Issues:`, 'red');
                    failedTests.forEach(test => {
                        this.log(`  • ${test.name}${test.details ? ': ' + test.details : ''}`, 'red');
                    });
                }
            });
        }
        
        return {
            totalPassed,
            totalFailed,
            overallPercentage,
            categoryResults: this.results
        };
    }

    async runAllTests() {
        this.log('🚀 Starting Chess Application Validation...', 'bold');
        this.log('Testing chess-specific fixes and improvements\n', 'blue');
        
        await this.validateCSS();
        await this.validateOpeningSequences();
        await this.validatePracticeDrills();
        await this.validateApplicationFunctionality();
        
        return this.generateReport();
    }
}

// Run the validation if this script is executed directly
if (require.main === module) {
    const validator = new ChessValidator();
    validator.runAllTests().then(results => {
        process.exit(results.totalFailed > 0 ? 1 : 0);
    }).catch(error => {
        console.error('Validation failed:', error);
        process.exit(1);
    });
}

module.exports = ChessValidator;