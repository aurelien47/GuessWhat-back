BEGIN;

-- Peuplement de la table roles
INSERT INTO roles (name) VALUES 
('Admin'),
('Player');


-- Peuplement de la table users
INSERT INTO users (email, password, role_id, username) VALUES 
('alice@example.com', '$2b$10$rlFKdNVI3x3RMex2WHMHp.GFbo45Qu0RuXch9nYEb57fU.O2YIIm.', (SELECT id FROM roles WHERE name = 'Admin'), 'Alice'),
('bob@example.com', '$2b$10$rlFKdNVI3x3RMex2WHMHp.GFbo45Qu0RuXch9nYEb57fU.O2YIIm.', (SELECT id FROM roles WHERE name = 'Player'), 'Bob'),
('carol@example.com', '$2b$10$rlFKdNVI3x3RMex2WHMHp.GFbo45Qu0RuXch9nYEb57fU.O2YIIm.', (SELECT id FROM roles WHERE name = 'Player'), 'Carol');

-- Peuplement de la table themes
INSERT INTO themes (name) VALUES
('HTML'),
('CSS'),
('JAVASCRIPT');

-- Peuplement de la table riddles
INSERT INTO riddles (theme_id, content, wiki, indicator) VALUES
((SELECT id FROM themes WHERE name = 'HTML'), 'Je suis une balise HTML qui peut être vide, mais j''ai un grand impact sur l''affichage de votre page. Je ne suis pas visible par les utilisateurs, mais je suis essentiel pour structurer vos données. Qui suis-je ?', 'https://developer.mozilla.org/fr/docs/Web/HTML/Element/img' ,'Je suis souvent utilisé pour incorporer des images dans une page web.'),
((SELECT id FROM themes WHERE name = 'CSS'), 'Je suis une propriété CSS qui change la façon dont vos éléments sont disposés. Sans moi, tout serait aligné de la même manière, mais avec moi, vous pouvez faire des mises en page complexes. Qui suis-je ?', 'https://developer.mozilla.org/fr/docs/Web/CSS/display', 'Je suis particulièrement utile pour créer des mises en page responsives et flexibles.'),
((SELECT id FROM themes WHERE name = 'JAVASCRIPT'), 'Je suis une fonctionnalité de JavaScript qui peut être à la fois utile et frustrante. Je permets l''exécution asynchrone, ce qui signifie que je peux faire attendre votre code. Qui suis-je ?', 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise', 'Je suis souvent utilisé pour gérer les opérations qui prennent du temps, comme les requêtes réseau.');

-- Peuplement de la table answers
INSERT INTO answers (content, is_good_answer, riddle_id) VALUES
('div', false ,1),
('img', true,1),
('p', false ,1),
('h1', false ,1),
('a', false ,1),
('margin', false ,2),
('display', true ,2),
('color', false ,2),
('border', false ,2),
('padding', false ,2),
('Promises', true ,3),
('Array', false ,3),
('Function', false ,3),
('Object', false ,3),
('Variable', false ,3);

COMMIT;