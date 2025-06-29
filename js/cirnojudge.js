document.addEventListener('DOMContentLoaded', function() {
    const problemElement = document.getElementById('problem');
    const option1 = document.getElementById('option1');
    const option2 = document.getElementById('option2');
    const currentElement = document.getElementById('current');
    const startBtn = document.getElementById('startBtn');
    const gameMessageElement = document.getElementById('gameMessage');
    
    let correctAnswer;
    let currentSum;
    let timer;
    let currentQuestion = 0;
    const totalQuestions = 20;
    const timePerQuestion = 2000; // 2秒(毫秒)
    let gameActive = false;
    
    // 生成新题目
    function generateNewProblem() {
        if (!gameActive) return;
        
        currentQuestion++;
        currentElement.textContent = currentQuestion;
        
        // 启用选项按钮
        option1.disabled = false;
        option2.disabled = false;
        
        // 生成第一个加数 (0-9)
        const num1 = Math.floor(Math.random() * 10);
        
        // 生成第二个加数，确保两数之和不超过9
        const maxNum2 = 9 - num1;
        const num2 = Math.floor(Math.random() * (maxNum2 + 1));
        
        currentSum = num1 + num2;
        
        // 显示题目
        problemElement.textContent = `${num1} + ${num2} = ?`;
        
        // 生成选项
        let options = [];
        
        // 第一个选项是正确答案还是错误答案取决于和是否为9
        if (currentSum === 9) {
            correctAnswer = 9;
            // 另一个选项是随机数 (0-8)，不能是9
            let wrongOption;
            do {
                wrongOption = Math.floor(Math.random() * 9);
            } while (wrongOption === correctAnswer);
            options = [correctAnswer, wrongOption];
        } else {
            // 正确答案是错误的那个选项
            // 先生成一个随机数作为"错误"选项
            let wrongOption;
            do {
                wrongOption = Math.floor(Math.random() * 10);
            } while (wrongOption === currentSum);
            
            correctAnswer = wrongOption;
            options = [currentSum, correctAnswer];
        }
        
        // 随机打乱选项顺序
        if (Math.random() < 0.5) {
            options = [options[1], options[0]];
        }
        
        // 设置按钮文本
        option1.textContent = options[0];
        option2.textContent = options[1];
        
        // 开始计时
        startTimer();
    }
    
    // 开始计时器
    function startTimer() {
        clearTimeout(timer);
        timer = setTimeout(function() {
            if (gameActive) {
                endGame(false);
            }
        }, timePerQuestion);
    }
    
    // 检查答案
    function checkAnswer(selectedOption) {
        if (!gameActive) return;
        
        clearTimeout(timer);
        const selectedNumber = parseInt(selectedOption.textContent);
        
        if (selectedNumber === correctAnswer) {
            // 回答正确，直接进入下一题或通关
            if (currentQuestion < totalQuestions) {
                generateNewProblem();
            } else {
                endGame(true);
            }
        } else {
            // 回答错误，结束游戏
            endGame(false);
        }
    }
    
    // 开始游戏
    function startGame() {
        currentQuestion = 0;
        gameMessageElement.textContent = '';
        gameMessageElement.className = 'game-message';
        gameActive = true;
        startBtn.disabled = true;
        startBtn.textContent = '少女答题中...';
        generateNewProblem();
    }
    
    // 结束游戏
    function endGame(success) {
        gameActive = false;
        clearTimeout(timer);
        startBtn.disabled = false;
        startBtn.textContent = '再试一次';
        
        option1.disabled = true;
        option2.disabled = true;
        
        if (success) {
            gameMessageElement.textContent = '你不是⑨';
            gameMessageElement.className = 'game-message pass-message';
        } else {
            gameMessageElement.textContent = '你是⑨';
            gameMessageElement.className = 'game-message';
        }
    }
    
    // 事件监听器
    option1.addEventListener('click', function() {
        checkAnswer(option1);
    });
    
    option2.addEventListener('click', function() {
        checkAnswer(option2);
    });
    
    startBtn.addEventListener('click', startGame);
    
    // 初始状态
    option1.disabled = true;
    option2.disabled = true;
});