import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";

type Props = {
  ImgArr: string[];
};

const SkillsCarousel = ({ ImgArr }: Props) => {
  console.log(ImgArr);

  const arr = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s",
    "https://freerangestock.com/sample/130131/red-hair-woman-with-camera-.jpg",
    "https://cdn.pixabay.com/photo/2019/01/28/02/10/girl-taking-photo-3959468_1280.jpg",
    "https://st3.depositphotos.com/3195613/19478/i/450/depositphotos_194787348-stock-photo-sian-young-women-people-hiking.jpg",
  ];

  return (
    <Carousel className="max-w-[90%] h-[30rem]">
      <CarouselContent>
        {arr.map((url, index) => (
          <CarouselItem className="h-[29rem]" key={index}>
            <div className="p-1 h-full w-full">
              <Card className="h-full w-full">
                <CardContent className="flex aspect-square self-center h-full w-full items-center justify-center p-6">
                  <img
                    className="h-full w-full object-cover object-center"
                    src={url}
                    alt={`Image ${index + 1}`}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default SkillsCarousel;
