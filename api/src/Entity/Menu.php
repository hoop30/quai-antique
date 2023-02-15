<?php

namespace App\Entity;

use App\Repository\MenuRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: MenuRepository::class)]
class Menu
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('menus')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('menus')]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups('menus')]
    private ?float $price = null;

    #[ORM\Column(length: 255)]
    #[Groups('menus')]
    private ?string $type = null;

    #[ORM\ManyToMany(targetEntity: Dish::class, inversedBy: 'Menu')]
    private Collection $Dish;

    public function __construct()
    {
        $this->Dish = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return Collection<int, Dish>
     */
    public function getDish(): Collection
    {
        return $this->Dish;
    }

    public function addDish(Dish $dish): self
    {
        if (!$this->Dish->contains($dish)) {
            $this->Dish->add($dish);
        }

        return $this;
    }

    public function removeDish(Dish $dish): self
    {
        $this->Dish->removeElement($dish);

        return $this;
    }
}
