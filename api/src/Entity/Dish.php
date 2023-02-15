<?php

namespace App\Entity;

use App\Repository\DishRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DishRepository::class)]
class Dish
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups('dishs')]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups('dishs')]
    private ?string $type = null;

    #[ORM\Column(length: 255)]
    #[Groups('dishs')]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups('dishs')]
    private ?float $price = null;

    #[ORM\ManyToMany(targetEntity: Menu::class, mappedBy: 'Dish')]
    private Collection $Menu;

    public function __construct()
    {
        $this->Menu = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * @return Collection<int, Menu>
     */
    public function getMenu(): Collection
    {
        return $this->Menu;
    }

    public function addMenu(Menu $menu): self
    {
        if (!$this->Menu->contains($menu)) {
            $this->Menu->add($menu);
            $menu->addDish($this);
        }

        return $this;
    }

    public function removeMenu(Menu $menu): self
    {
        if ($this->Menu->removeElement($menu)) {
            $menu->removeDish($this);
        }

        return $this;
    }
}
