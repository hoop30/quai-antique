<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Entity\User;
use App\Repository\ReservationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ReservationController extends AbstractController
{
    #[Route('/reservation', name: 'reservation_getall', methods:["GET"])]
    public function userGet(ReservationRepository $reservationRepository)
    {
        // return all the user of userRepository
        return $this->json($reservationRepository->findAll(), 200, []);
    }

    #[Route('/reservation', name: 'reservation_new', methods:["POST"])]
    public function userPost(Request $request, SerializerInterface $serializer, EntityManagerInterface $em)
    {
        // add the data
        $data = $request->getContent();
        // create a new user with the data
        $newReservation = $serializer->deserialize($data, Reservation::class, 'json');
        // send new user to the DB
        $em->persist($newReservation);
        $em->flush();
        // return the new user
        return $this->json($newReservation, 201, []);
    }

    #[Route('/reservation', name: 'reservation_update', methods:["PUT"])]
    public function userPut(Request $request, SerializerInterface $serializer, ReservationRepository $reservationRepository, EntityManagerInterface $em)
    {
        // add the new data
        $data = $request->getContent();
        $updateReservation = $serializer->deserialize($data, Reservation::class, 'json');
        $id = $updateReservation->getId();
        // find the user to update
        $reservation = $reservationRepository->find($id);
        // update
        $reservation
            ->setName($updateReservation->getName())
            ->setDate($updateReservation->getDate())
            ->setInfo($updateReservation->getInfo());
        
        // update send in DB
        $em->persist($reservation);
        $em->flush();

        // reurn the update user
        return $this->json($reservation, 201, []);
    }
}
