import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const genres = ['Все', 'Поп', 'Рок', 'Рэп', 'Электро', 'Джаз', 'Блюз', 'Классика'];
const languages = ['Все', 'Русский', 'Английский', 'Испанский', 'Французский'];

const songs = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', genre: 'Рок', language: 'Английский', duration: '5:55', image: 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg' },
  { id: 2, title: 'Миллион алых роз', artist: 'Алла Пугачёва', genre: 'Поп', language: 'Русский', duration: '4:12', image: 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg' },
  { id: 3, title: 'Lose Yourself', artist: 'Eminem', genre: 'Рэп', language: 'Английский', duration: '5:26', image: 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg' },
  { id: 4, title: 'Summertime', artist: 'Ella Fitzgerald', genre: 'Джаз', language: 'Английский', duration: '3:45', image: 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg' },
  { id: 5, title: 'Группа крови', artist: 'Кино', genre: 'Рок', language: 'Русский', duration: '4:45', image: 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg' },
  { id: 6, title: 'Billie Jean', artist: 'Michael Jackson', genre: 'Поп', language: 'Английский', duration: '4:54', image: 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg' },
  { id: 7, title: 'Around the World', artist: 'Daft Punk', genre: 'Электро', language: 'Английский', duration: '7:09', image: 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg' },
  { id: 8, title: 'La Vie en Rose', artist: 'Édith Piaf', genre: 'Классика', language: 'Французский', duration: '3:30', image: 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg' },
  { id: 9, title: 'Владимирский централ', artist: 'Михаил Круг', genre: 'Блюз', language: 'Русский', duration: '4:20', image: 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg' },
  { id: 10, title: 'Despacito', artist: 'Luis Fonsi', genre: 'Поп', language: 'Испанский', duration: '3:47', image: 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg' },
  { id: 11, title: 'Back in Black', artist: 'AC/DC', genre: 'Рок', language: 'Английский', duration: '4:15', image: 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg' },
  { id: 12, title: 'Smooth Criminal', artist: 'Michael Jackson', genre: 'Поп', language: 'Английский', duration: '4:17', image: 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [selectedLanguage, setSelectedLanguage] = useState('Все');

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Все' || song.genre === selectedGenre;
    const matchesLanguage = selectedLanguage === 'Все' || song.language === selectedLanguage;
    return matchesSearch && matchesGenre && matchesLanguage;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-8 bg-primary rounded-full sound-wave"></div>
              ))}
            </div>
            <h1 className="text-2xl font-heading font-bold gradient-text">Караоке Студия</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Icon name="Home" size={20} className="mr-2" />
              Главная
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Icon name="Music" size={20} className="mr-2" />
              Каталог
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Icon name="ListMusic" size={20} className="mr-2" />
              Плейлисты
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Icon name="User" size={20} className="mr-2" />
              Профиль
            </Button>
          </nav>
          <Button className="bg-primary hover:bg-primary/90">
            <Icon name="Mic" size={20} className="mr-2" />
            Начать петь
          </Button>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-6 gradient-text">
              Пой как звезда
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Более 10,000 песен на всех языках мира. Найди свою любимую композицию и начни петь прямо сейчас!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 animate-slide-up">
                <Icon name="Play" size={24} className="mr-2" />
                Начать петь
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 animate-slide-up border-primary/50 hover:bg-primary/10" style={{ animationDelay: '0.1s' }}>
                <Icon name="Heart" size={24} className="mr-2" />
                Избранное
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Icon name="Music2" size={32} className="text-primary" />
            <h3 className="text-3xl font-heading font-bold">Каталог песен</h3>
          </div>

          <div className="mb-8 space-y-6">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Найти песню или исполнителя..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-border/50 text-lg"
              />
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <Icon name="Filter" size={16} />
                  Жанр
                </p>
                <div className="flex flex-wrap gap-2">
                  {genres.map(genre => (
                    <Badge
                      key={genre}
                      variant={selectedGenre === genre ? "default" : "outline"}
                      className={`cursor-pointer px-4 py-2 text-sm transition-all hover-lift ${
                        selectedGenre === genre 
                          ? 'bg-primary text-primary-foreground' 
                          : 'border-border/50 hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedGenre(genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <Icon name="Languages" size={16} />
                  Язык
                </p>
                <div className="flex flex-wrap gap-2">
                  {languages.map(language => (
                    <Badge
                      key={language}
                      variant={selectedLanguage === language ? "default" : "outline"}
                      className={`cursor-pointer px-4 py-2 text-sm transition-all hover-lift ${
                        selectedLanguage === language 
                          ? 'bg-accent text-accent-foreground' 
                          : 'border-border/50 hover:border-accent/50'
                      }`}
                      onClick={() => setSelectedLanguage(language)}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSongs.map((song, index) => (
              <Card 
                key={song.id} 
                className="group overflow-hidden bg-card border-border/50 hover-lift cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={song.image} 
                    alt={song.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full w-16 h-16 p-0">
                      <Icon name="Play" size={28} />
                    </Button>
                  </div>
                  <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm">
                    {song.duration}
                  </Badge>
                </div>
                <div className="p-4">
                  <h4 className="font-heading font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    {song.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{song.artist}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs bg-secondary/20 border-secondary/30">
                        {song.genre}
                      </Badge>
                      <Badge variant="outline" className="text-xs border-border/50">
                        {song.language}
                      </Badge>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:text-accent">
                      <Icon name="Heart" size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredSongs.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Music" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Песни не найдены</p>
              <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить фильтры или поисковый запрос</p>
            </div>
          )}
        </div>
      </section>

      <footer className="py-12 border-t border-border/40 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1 h-6 bg-primary rounded-full sound-wave"></div>
                ))}
              </div>
              <span className="font-heading font-bold text-lg gradient-text">Караоке Студия</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 Все права защищены</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Youtube" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Twitter" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
